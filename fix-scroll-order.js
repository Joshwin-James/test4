const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const fixScript = `
<script>
window.addEventListener('load', () => {
  // Give GSAP a tiny delay to ensure all load events have finished firing
  setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      console.log('ScrollTriggers sorted and refreshed.');
    }
  }, 200);
});
</script>
</body>`;

html = html.replace('</body>', fixScript);

fs.writeFileSync(indexPath, html);
console.log('Injected ScrollTrigger sort and refresh.');
