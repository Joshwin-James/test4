const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldCss = `#chat-btn{position:fixed;bottom:100px;right:40px;width:64px;height:64px;background:var(--dark);border-radius:0;border:1px solid var(--dark);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:8800;box-shadow:var(--sh-md);transition:var(--ease);}
#chat-btn:hover{transform:scale(1.05);background:var(--grey);border-color:var(--grey)}
#chat-btn svg{width:28px;height:28px;fill:#fff;transition:var(--ease)}
#chat-btn.open svg.ico-chat{display:none}
#chat-btn.open svg.ico-close{display:block}
#chat-btn svg.ico-close{display:none}
  
  #chatbox{position:fixed;bottom:100px;right:28px;`;

const newCss = `#chat-btn{position:fixed;bottom:30px;right:30px;width:auto;height:auto;padding:12px 24px;gap:10px;background:var(--primary);border-radius:40px;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:8800;box-shadow:var(--sh-xl);transition:all 0.4s cubic-bezier(0.25,1,0.5,1);color:#fff;font-family:var(--body);font-weight:600;font-size:15px;letter-spacing:0.3px;}
#chat-btn:hover{transform:translateY(-4px);background:var(--dark);box-shadow:0 12px 32px rgba(0,0,0,0.3);}
#chat-btn svg{width:20px;height:20px;transition:var(--ease);flex-shrink:0;}
#chat-btn.open .chat-btn-text { display: none; }
#chat-btn.open { padding: 16px; width: 54px; height: 54px; border-radius: 50%; }
#chat-btn.open svg.ico-chat{display:none}
#chat-btn.open svg.ico-close{display:block; width: 22px; height: 22px; fill: #fff;}
#chat-btn svg.ico-close{display:none}
  
  #chatbox{position:fixed;bottom:95px;right:30px;`;

const oldHtml = `<button id="chat-btn" onclick="toggleChat()" aria-label="Chat with MP Assistant">
  <svg class="ico-chat" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a1.5 1.5 0 00-1.5-1.5H19V8c0-1.1-.9-2-2-2h-3.5V4.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V6H7c-1.1 0-2 .9-2 2v2H3.5a1.5 1.5 0 00-1.5 1.5v3c0 .83.67 1.5 1.5 1.5H5v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h1.5c.83 0 1.5-.67 1.5-1.5v-3zM8.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 18c-2.4 0-4.5-1.5-5.5-3.5h11c-1 2-3.1 3.5-5.5 3.5z"/></svg>
  <svg class="ico-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
</button>`;

const newHtml = `<button id="chat-btn" onclick="toggleChat()" aria-label="Help and Support">
  <svg class="ico-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
  <span class="chat-btn-text">Help & Support</span>
  <svg class="ico-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
</button>`;

let count = 0;
if (html.includes(oldCss.split('\n')[0])) {
  html = html.replace(oldCss, newCss);
  count++;
}
if (html.includes('<button id="chat-btn"')) {
  html = html.replace(oldHtml, newHtml);
  count++;
}

fs.writeFileSync(indexPath, html);
console.log('Updated chat button to pill shape with headphone icon: ' + count + ' replacements');
