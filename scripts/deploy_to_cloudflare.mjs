import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load .env and .env.local using Node's built-in env loader if available
if (typeof process.loadEnvFile === 'function') {
  if (fs.existsSync('.env')) {
    process.loadEnvFile('.env');
  }
  if (fs.existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
  }
}

const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const zoneId = process.env.CLOUDFLARE_ZONE_ID || 'ca4409c1a1cb974fc665fe848e875d9c';
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || 'timsuperville-portfolio';
const domainsToAttach = ['tsuperville.com', 'www.tsuperville.com'];

if (!apiToken || !accountId) {
  console.error('❌ CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID is missing from .env');
  process.exit(1);
}

console.log('=================================================');
console.log('🚀 Deploying Tim Superville Website to Cloudflare Pages');
console.log('=================================================');
console.log(`🔑 Account ID: ${accountId.substring(0, 8)}...`);
console.log(`📦 Pages Project: ${projectName}`);
console.log(`🌐 Target Domains: ${domainsToAttach.join(', ')}`);

const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'docs');

// Step 1: Ensure Cloudflare Pages Project Exists
async function ensurePagesProject() {
  console.log(`\n🔍 Checking if Pages project "${projectName}" exists...`);
  try {
    const checkRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}`,
      {
        headers: { Authorization: `Bearer ${apiToken}` }
      }
    );
    const checkData = await checkRes.json();
    if (checkData.success) {
      console.log(`✅ Pages project "${projectName}" already exists.`);
      return;
    }

    console.log(`➕ Creating Pages project "${projectName}"...`);
    const createRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: projectName,
          production_branch: 'main'
        })
      }
    );
    const createData = await createRes.json();
    if (createData.success) {
      console.log(`✅ Pages project "${projectName}" created successfully!`);
    } else {
      console.warn('⚠️ Pages project response:', createData.errors);
    }
  } catch (err) {
    console.error('❌ Error checking/creating Pages project:', err.message);
  }
}

// Step 2: Build the project
function buildProject() {
  console.log('\n🔨 Building application (npm run build)...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully.');
}

// Step 3: Deploy to Cloudflare Pages via Wrangler
function deployWithWrangler() {
  console.log(`\n☁️ Uploading build assets (${buildDir}) to Cloudflare Pages...`);
  try {
    process.env.CLOUDFLARE_API_TOKEN = apiToken;
    process.env.CLOUDFLARE_ACCOUNT_ID = accountId;

    execSync(
      `npx -y wrangler pages deploy "${buildDir}" --project-name="${projectName}" --branch="main" --commit-dirty=true`,
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          CLOUDFLARE_API_TOKEN: apiToken,
          CLOUDFLARE_ACCOUNT_ID: accountId
        }
      }
    );
    console.log('✅ Cloudflare Pages deployment completed!');
  } catch (deployErr) {
    console.error('❌ Wrangler deployment failed:', deployErr.message);
    throw deployErr;
  }
}

// Step 4: Attach Custom Domains to Cloudflare Pages Project
async function attachCustomDomains() {
  console.log('\n🔗 Attaching custom domains to Cloudflare Pages project...');
  for (const domain of domainsToAttach) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: domain })
        }
      );
      const data = await res.json();
      if (data.success) {
        console.log(`✅ Attached domain "${domain}" to project.`);
      } else {
        const alreadyExists = data.errors?.some(e =>
          e.message?.toLowerCase().includes('already exists')
        );
        if (alreadyExists) {
          console.log(`ℹ️ Domain "${domain}" is already attached to project.`);
        } else {
          console.warn(`⚠️ Could not attach domain "${domain}":`, data.errors);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Error attaching domain "${domain}":`, err.message);
    }
  }
}

// Step 5: Clean up old GitHub Pages DNS records and point to Cloudflare Pages
async function updateDnsRecords() {
  console.log(`\n📡 Updating DNS records in Cloudflare Zone ${zoneId} (tsuperville.com)...`);
  try {
    const listRes = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100`,
      {
        headers: { Authorization: `Bearer ${apiToken}` }
      }
    );
    const listData = await listRes.json();
    if (!listData.success) {
      console.error('❌ Failed to fetch DNS records:', listData.errors);
      return;
    }

    const records = listData.result;
    console.log(`Found ${records.length} total DNS records.`);

    // GitHub Pages IP patterns to clean up from root domain
    const githubIps = [
      '185.199.108.153',
      '185.199.109.153',
      '185.199.110.153',
      '185.199.111.153',
      '2606:50c0:8000::153',
      '2606:50c0:8001::153',
      '2606:50c0:8002::153',
      '2606:50c0:8003::153'
    ];

    for (const rec of records) {
      // 1. Delete old GitHub Pages A/AAAA records for tsuperville.com
      if ((rec.name === 'tsuperville.com' || rec.name === '@') && (rec.type === 'A' || rec.type === 'AAAA') && githubIps.includes(rec.content)) {
        console.log(`🗑️ Removing obsolete GitHub Pages record: ${rec.type} ${rec.name} -> ${rec.content} (id: ${rec.id})`);
        const delRes = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${rec.id}`,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${apiToken}` }
          }
        );
        const delData = await delRes.json();
        if (delData.success) {
          console.log(`   ✅ Deleted.`);
        } else {
          console.warn(`   ⚠️ Delete failed:`, delData.errors);
        }
      }

      // 2. Update www CNAME if it points to timsuperville.github.io
      if (rec.name === 'www.tsuperville.com' && rec.type === 'CNAME' && rec.content.includes('github.io')) {
        console.log(`🔄 Updating www CNAME from ${rec.content} to ${projectName}.pages.dev...`);
        const updateRes = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${rec.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'CNAME',
              name: 'www',
              content: `${projectName}.pages.dev`,
              ttl: 1,
              proxied: true
            })
          }
        );
        const updateData = await updateRes.json();
        if (updateData.success) {
          console.log('   ✅ www CNAME successfully pointed to Cloudflare Pages.');
        } else {
          console.warn('   ⚠️ Failed to update www CNAME:', updateData.errors);
        }
      }
    }

    // Check if apex CNAME exists for tsuperville.com
    const apexRecord = records.find(r => (r.name === 'tsuperville.com' || r.name === '@') && r.type === 'CNAME');
    if (!apexRecord) {
      console.log(`➕ Creating apex CNAME: tsuperville.com -> ${projectName}.pages.dev (proxied)...`);
      const createApexRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'CNAME',
            name: '@',
            content: `${projectName}.pages.dev`,
            ttl: 1,
            proxied: true
          })
        }
      );
      const createApexData = await createApexRes.json();
      if (createApexData.success) {
        console.log('   ✅ Apex CNAME created successfully with Cloudflare CNAME flattening.');
      } else {
        // If domain attachment already handles apex or record exists under another type:
        console.log('   ℹ️ Apex DNS note:', createApexData.errors?.[0]?.message || createApexData.errors);
      }
    } else {
      console.log(`ℹ️ Apex CNAME already exists: ${apexRecord.name} -> ${apexRecord.content}`);
    }

    // Check www CNAME exists
    const wwwRecord = records.find(r => r.name === 'www.tsuperville.com');
    if (!wwwRecord) {
      console.log(`➕ Creating www CNAME: www -> ${projectName}.pages.dev (proxied)...`);
      const createWwwRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'CNAME',
            name: 'www',
            content: `${projectName}.pages.dev`,
            ttl: 1,
            proxied: true
          })
        }
      );
      const createWwwData = await createWwwRes.json();
      if (createWwwData.success) {
        console.log('   ✅ www CNAME created successfully.');
      }
    }

  } catch (err) {
    console.error('❌ Error updating DNS records:', err.message);
  }
}

// Main execution
async function main() {
  await ensurePagesProject();
  buildProject();
  deployWithWrangler();
  await attachCustomDomains();
  await updateDnsRecords();

  console.log('\n=================================================');
  console.log('🎉 LIVE DEPLOYMENT COMPLETE!');
  console.log(`   Cloudflare Pages URL: https://${projectName}.pages.dev`);
  console.log(`   Primary Domain:       https://tsuperville.com`);
  console.log(`   WWW Domain:           https://www.tsuperville.com`);
  console.log('=================================================');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
