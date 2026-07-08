const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const errHandler = `
<script>
window.addEventListener('error', function(e) {
  const errBox = document.createElement('div');
  errBox.style.cssText = 'position:fixed; top:10px; left:10px; background:red; color:white; padding:15px; z-index:999999; font-family:monospace; max-width:80%;';
  errBox.innerHTML = '<strong>JS Error:</strong> ' + e.message + '<br>Line: ' + e.lineno + ' in ' + e.filename;
  document.body.appendChild(errBox);
});
</script>
`;

if (!html.includes('JS Error:')) {
  html = html.replace('<body>', '<body>\n' + errHandler);
  fs.writeFileSync(indexPath, html);
  console.log('Injected error handler.');
}
