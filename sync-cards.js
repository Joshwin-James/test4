const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldGsap = /onUpdate: \(self\) => \{[\s\S]*?\}\);/g;

const newGsap = `onUpdate: (self) => {
        let p = self.progress;
        if (p < 0.25) {
          vwfItems.forEach(item => item.classList.remove('active'));
        } else {
          let lineProgress = (p - 0.25) / 0.75;
          
          // Calculate precise positions of each dot relative to the timeline to sync exactly with the line
          const timelineHeight = document.querySelector('.vwf-timeline').offsetHeight;
          const dotThresholds = vwfItems.map(item => {
            const dot = item.querySelector('.vwf-center');
            // item.offsetTop gives position relative to vwf-timeline
            // dot.offsetTop gives position relative to item
            return (item.offsetTop + dot.offsetTop + (dot.offsetHeight / 2)) / timelineHeight;
          });

          let activeIndex = -1;
          if (lineProgress >= dotThresholds[0]) activeIndex = 0;
          if (lineProgress >= dotThresholds[1]) activeIndex = 1;
          if (lineProgress >= dotThresholds[2]) activeIndex = 2;

          vwfItems.forEach((item, i) => {
            if (i === activeIndex) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    }
  });`;

html = html.replace(/onUpdate: \(self\) => \{[\s\S]*?\}\n    \}\n  \}\);/, newGsap);

fs.writeFileSync(indexPath, html);
console.log('Fixed sync between line progress and card popups.');
