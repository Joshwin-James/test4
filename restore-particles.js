const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Boost overall canvas opacity in CSS
html = html.replace(
  /#why-canvas \{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0\.6; \}/g,
  '#why-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 1; }'
);
// Handle case if it was opacity 0.4
html = html.replace(
  /#why-canvas \{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0\.4; \}/g,
  '#why-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 1; }'
);

// 2. Adjust Canvas JS for density, opacity, and soft glow
const jsRegex = /function drawCanvas\(\) \{[\s\S]*?requestAnimationFrame\(drawCanvas\);\n          \}/m;
const newJs = `function drawCanvas() {
            ctx.clearRect(0, 0, width, height);
            
            // Increased opacity and premium styling
            ctx.fillStyle = 'rgba(15, 23, 42, 0.45)'; // Nodes
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.25)'; // Connecting lines
            
            particles.forEach((p, i) => {
              p.x += p.vx;
              p.y += p.vy;
              
              if(p.x < 0 || p.x > width) p.vx *= -1;
              if(p.y < 0 || p.y > height) p.vy *= -1;
              
              // Draw nodes with subtle glow
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size + 0.5, 0, Math.PI * 2);
              ctx.fill();
              
              // Draw lines
              for(let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if(dist < 150) {
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
                }
              }
            });
            requestAnimationFrame(drawCanvas);
          }`;

html = html.replace(jsRegex, newJs);

// 3. Increase particle density from 50 to 65
html = html.replace(/for\(let i = 0; i < 50; i\+\+\) \{/g, 'for(let i = 0; i < 65; i++) {');

fs.writeFileSync(indexPath, html);
console.log('Restored particle visibility.');
