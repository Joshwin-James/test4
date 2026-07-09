const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove the glowing orbs
html = html.replace('.glass-contact-section::before {\n  content: \'\'; position: absolute; top: -20%; left: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%); border-radius: 50%;\n}\n.glass-contact-section::after {\n  content: \'\'; position: absolute; bottom: -20%; right: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%); border-radius: 50%;\n}', '');

// 2. Change background to theme dark
html = html.replace('background: linear-gradient(135deg, #090912 0%, #151030 50%, #0a0f25 100%);', 'background: var(--dark);');

// 3. Update the submit button to theme primary
const oldBtnCSS = /\.glass-submit {[\s\S]*?}/;
const newBtnCSS = `.glass-submit {
  background: var(--primary);
  border: none;
  border-radius: 40px;
  padding: 20px 32px;
  color: #fff;
  font-family: var(--body);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
  transition: all 0.3s;
}`;
html = html.replace(oldBtnCSS, newBtnCSS);

const oldBtnHover = /\.glass-submit:hover {[\s\S]*?}/;
const newBtnHover = `.glass-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
  background: #1d4ed8;
}`;
html = html.replace(oldBtnHover, newBtnHover);

// 4. Update the icons in the HTML
// Replace Email Icon
const oldEmailIco = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
const newEmailIco = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.8 1.5 5.29 3.82 6.88-.34 1.57-1.4 3.03-1.5 3.16-.14.18-.08.43.12.53.1.05.21.05.31 0 2.06-1.12 3.65-1.92 4.4-2.22.92.23 1.87.35 2.85.35 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm-4 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>';
html = html.replace(oldEmailIco, newEmailIco);

// Replace Location Icon
const oldLocIco = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
const newLocIco = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';
html = html.replace(oldLocIco, newLocIco);

// Replace Phone Icon
const oldPhoneIco = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
const newPhoneIco = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.62 13.93l-2.09 2.09c-2.7-1.22-4.94-3.46-6.16-6.16l2.09-2.09c.19-.19.27-.47.2-.73-.24-.8-.37-1.66-.37-2.54 0-.55-.45-1-1-1H6.5c-.55 0-1 .45-1 1 0 6.35 5.15 11.5 11.5 11.5.55 0 1-.45 1-1v-2.8c0-.55-.45-1-1-1-.88 0-1.74-.13-2.54-.37-.26-.07-.54 0-.73.2z"/></svg>';
html = html.replace(oldPhoneIco, newPhoneIco);

fs.writeFileSync(indexPath, html);
console.log('Fixed contact section theme and replaced icons.');
