#!/usr/bin/env node
// PreToolUse guard for the Uni-Manager workspace.
// Denies or escalates (ask) risky actions regardless of what the model decides.
// Source of truth: Documents/GitHub/.claude/hooks/guard.mjs — copied into each repo by
// .claude/scripts/sync-repo-config.mjs. Edit the workspace copy, then re-run the sync.

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', c => (raw += c));
process.stdin.on('end', () => {
  let input;
  try { input = JSON.parse(raw || '{}'); } catch { process.exit(0); }
  const tool = input.tool_name || '';
  const ti = input.tool_input || {};
  const verdict = check(tool, ti);
  if (verdict) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: verdict.decision,
        permissionDecisionReason: verdict.reason,
      },
    }));
  }
  process.exit(0);
});

const norm = p => String(p || '').replace(/\\/g, '/');
const base = p => norm(p).split('/').pop() || '';

// Files whose contents are real secrets.
function isSecretFile(p) {
  const b = base(p).toLowerCase();
  if (/\.(example|sample|template)$/.test(b)) return false;
  if (b === '.env' || b === '.env.local' || /^\.env\..*\.local$/.test(b)) return true;
  if (/\.(key|pem|p12|pfx|jks|keystore)$/.test(b)) return true;
  if (/service[-_]?account.*\.json$/.test(b)) return true;
  return false;
}

// Committed env files may be edited only deliberately.
function isEnvFile(p) {
  const b = base(p).toLowerCase();
  return /^\.env(\.|$)/.test(b) && !/\.(example|sample|template)$/.test(b);
}

function check(tool, ti) {
  if (['Edit', 'Write', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
    const p = ti.file_path || ti.notebook_path;
    if (isSecretFile(p)) return { decision: 'deny', reason: `Refusing to modify secret file ${base(p)}. Edit it manually.` };
    if (isEnvFile(p)) return { decision: 'ask', reason: `${base(p)} is an environment file — confirm this edit (no secrets in committed env files).` };
    return null;
  }
  if (tool === 'Read') {
    if (isSecretFile(ti.file_path)) return { decision: 'deny', reason: `${base(ti.file_path)} contains secrets; ask Shawn for the specific value or use the .env.example key names.` };
    return null;
  }
  if (tool !== 'Bash' && tool !== 'PowerShell') return null;

  const cmd = String(ti.command || '');
  const c = cmd.replace(/\s+/g, ' ');

  const deny = [
    [/gradlew(\.bat)?\b[^|;&]*\binstall(Debug|Release)\b/i, 'installDebug pushes to EVERY connected ADB device (incl. Michelle\'s phone). Use assembleDebug, then `adb -s <serial> install -r <apk>`.'],
    [/\badb\b(?![^|;&]*\s-s\s)[^|;&]*\binstall\b/i, 'adb install must target an explicit device: `adb -s <serial> install -r <apk>`.'],
    [/--set-secrets\b/, 'Use --update-secrets; --set-secrets wipes existing Cloud Run secret bindings.'],
    [/\b(cat|type|less|more|head|tail|bat|Get-Content|gc)\b[^|;&]*(^|[\s'"/\\])\.env(\.local|\.[\w-]+\.local)?(?=$|[\s'"])/i, 'Printing .env files would expose secrets to the transcript.'],
    [/\b(cat|type|Get-Content)\b[^|;&]*\.(key|pem)\b/i, 'Printing key files would expose secrets.'],
    [/\bterraform\b[^|;&]*\bdestroy\b/, 'terraform destroy is never run by the agent.'],
  ];
  for (const [re, reason] of deny) if (re.test(c)) return { decision: 'deny', reason };

  const ask = [
    [/\bgit\b[^|;&]*\bpush\b[^|;&]*(--force(?!-with-lease)|\s-f\b)/, 'Force push requires Shawn\'s explicit confirmation.'],
    [/\bgit\b[^|;&]*\breset\b[^|;&]*--hard/, 'git reset --hard discards work — confirm with Shawn.'],
    [/\bgit\b[^|;&]*\bclean\b[^|;&]*-[a-z]*f/, 'git clean -f deletes untracked files — confirm with Shawn.'],
    [/\bgit\b[^|;&]*\bpush\b/, 'Confirm git push.'],
    [/\bgit\b[^|;&]*\bcheckout\b[^|;&]*\s--\s*\.(\s|$)/, 'Discarding all working-tree changes — confirm.'],
    [/\b(firebase|firebase-tools)\b[^|;&]*\bdeploy\b/, 'Production Firebase deploy — confirm target.'],
    [/\bgcloud\b[^|;&]*\b(deploy|delete|set-iam-policy|secrets\s+versions\s+destroy)\b/, 'gcloud mutating command — confirm.'],
    [/\bterraform\b[^|;&]*\b(apply|import|state\s+rm)\b/, 'Terraform state change — confirm.'],
    [/\bwrangler\b[^|;&]*\b(deploy|publish|delete|secret)\b/, 'Cloudflare change — confirm.'],
    [/\bnpm\b[^|;&]*\b(publish|run\s+(deploy[\w:-]*|publish:r2|release:r2|tf:apply))\b/, 'Deploy/publish script — confirm.'],
    [/\bnode\b[^|;&]*scripts[\\/][^\s]*(deploy|publish|release|billing)[\w-]*\.(c|m)?js/i, 'Deploy/publish/billing script — confirm.'],
    [/\badb\b[^|;&]*\b(connect|shell|reboot|uninstall|install|push)\b/, 'ADB device action — confirm the target is Shawn\'s Pixel or the TV, never Michelle\'s phone without her permission.'],
    [/\bstripe\b[^|;&]*\b(post|delete|trigger)\b|api\.stripe\.com/i, 'Stripe mutation — confirm and prefer test mode.'],
    [/\b(mongosh|mongo)\b|deleteMany\(\s*\{\s*\}\s*\)|dropDatabase|drop\(\)/, 'Direct database operation — confirm environment and scope.'],
  ];
  for (const [re, reason] of ask) if (re.test(c)) return { decision: 'ask', reason };
  return null;
}
