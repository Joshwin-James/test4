const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldCss = `#chat-btn{position:fixed;bottom:30px;right:30px;width:auto;height:auto;padding:12px 24px;gap:10px;background:var(--primary);border-radius:40px;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:8800;box-shadow:var(--sh-xl);transition:all 0.4s cubic-bezier(0.25,1,0.5,1);color:#fff;font-family:var(--body);font-weight:600;font-size:15px;letter-spacing:0.3px;}
#chat-btn:hover{transform:translateY(-4px);background:var(--dark);box-shadow:0 12px 32px rgba(0,0,0,0.3);}
#chat-btn svg{width:20px;height:20px;transition:var(--ease);flex-shrink:0;}
#chat-btn.open .chat-btn-text { display: none; }
#chat-btn.open { padding: 16px; width: 54px; height: 54px; border-radius: 50%; }
#chat-btn.open svg.ico-chat{display:none}
#chat-btn.open svg.ico-close{display:block; width: 22px; height: 22px; fill: #fff;}
#chat-btn svg.ico-close{display:none}`;

const newCss = `#chat-btn{position:fixed;bottom:30px;right:30px;width:auto;height:auto;padding:14px 24px;gap:12px;background:rgba(15,23,42,0.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:8800;box-shadow:0 8px 32px rgba(0,0,0,0.25);transition:all 0.4s cubic-bezier(0.25,1,0.5,1);color:#fff;font-family:var(--body);font-weight:600;font-size:15px;letter-spacing:0.3px;}
#chat-btn:hover{transform:translateY(-4px) scale(1.02);background:rgba(15,23,42,0.95);box-shadow:0 12px 32px rgba(37,99,235,0.3);border-color:rgba(37,99,235,0.4);}
#chat-btn svg{width:22px;height:22px;transition:var(--ease);flex-shrink:0;}
#chat-btn .chat-btn-text { background: linear-gradient(90deg, #ffffff 0%, #60a5fa 50%, #ffffff 100%); background-size: 200% auto; color: #fff; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: textPremiumShine 4s linear infinite; }
@keyframes textPremiumShine { to { background-position: 200% center; } }
#chat-btn.open .chat-btn-text { display: none; }
#chat-btn.open { padding: 16px; width: 54px; height: 54px; border-radius: 16px; }
#chat-btn.open svg.ico-chat{display:none}
#chat-btn.open svg.ico-close{display:block; width: 22px; height: 22px; fill: #fff;}
#chat-btn svg.ico-close{display:none}`;

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
  fs.writeFileSync(indexPath, html);
  console.log('Updated chat button to premium rounded rectangle with shiny blue/white text.');
} else {
  console.log('Could not find the target CSS to replace.');
}
