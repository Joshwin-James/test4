const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The current HTML for the map side is:
// <div class="map-wrap" style="height: 100%; min-height: 400px; margin-top:0;">
// Let's replace it with a flex container that pushes the map to the bottom, aligning it with the contact list.

const oldMapRegex = /<!-- LEFT: MAP \(40%\) -->[\s\S]*?<div class="map-wrap" style="height: 100%; min-height: 400px; margin-top:0;">/;
const newMap = `<!-- LEFT: MAP (40%) -->
      <div style="display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
        <div class="map-wrap" style="height: 320px; margin-top: 0; width: 100%;">`;

if (html.match(oldMapRegex)) {
  html = html.replace(oldMapRegex, newMap);
  // We need to add the closing div for the new wrapper
  const oldIframeEnd = /title="MP Tax Associates Location"><\/iframe>\s*<\/div>/;
  const newIframeEnd = `title="MP Tax Associates Location"></iframe>
        </div>
      </div>`;
  html = html.replace(oldIframeEnd, newIframeEnd);
}

fs.writeFileSync(indexPath, html);
console.log('Map pushed down successfully.');
