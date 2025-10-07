const fs = require('fs');
const path = require('path');

const root = process.cwd();
const docs = path.join(root, 'docs');

function fail(msg){
  console.error('SMOKE CHECK FAIL:', msg);
  process.exit(2);
}

if (!fs.existsSync(docs)) fail('docs/ directory not found. Did you run `npm run build`?');

const index = path.join(docs, 'index.html');
if (!fs.existsSync(index)) fail('docs/index.html not found. Build may have failed.');

const html = fs.readFileSync(index, 'utf8');

// look for built CSS/JS assets referenced in index.html (accept ./assets/ or assets/)
const cssMatch = html.match(/href="\.?\/?(assets\/index-[^"]+\.css)"/);
const jsMatch = html.match(/src="\.?\/?(assets\/index-[^"]+\.js)"/);

if (!cssMatch) fail('Could not find built CSS asset in docs/index.html');
if (!jsMatch) fail('Could not find built JS asset in docs/index.html');

const cssPath = path.join(docs, cssMatch[1]);
const jsPath = path.join(docs, jsMatch[1]);

if (!fs.existsSync(cssPath)) fail(`Built CSS file missing: ${cssMatch[1]}`);
if (!fs.existsSync(jsPath)) fail(`Built JS file missing: ${jsMatch[1]}`);

console.log('SMOKE CHECK OK: docs/ exists and contains built assets');
process.exit(0);
