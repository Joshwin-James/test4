const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldTimeline = `      // Phase 1: Entrance animation BEFORE it pins (seamless as you scroll down to it)
      gsap.timeline({
        scrollTrigger: {
          trigger: "#workflow",
          start: "top 80%", 
          end: "center center", 
          scrub: 1
        }
      })`;

const newTimeline = `      // Phase 1: Entrance animation BEFORE it pins (seamless as you scroll down to it)
      gsap.timeline({
        scrollTrigger: {
          trigger: "#workflow",
          start: "top 100%", // Start animating exactly when it enters the bottom of the screen
          end: "top 40%", // Finish animation faster (before it even reaches the center)
          scrub: 1
        }
      })`;

if (html.includes(oldTimeline)) {
  html = html.replace(oldTimeline, newTimeline);
  fs.writeFileSync(indexPath, html);
  console.log('Updated workflow entrance animation timing.');
} else {
  console.log('Could not find the target code to replace.');
}
