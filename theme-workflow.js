const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The block to replace
const oldVerticalCss = /\/\* ── VERTICAL WORKFLOW ────────────────────────────── \*\/[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\n\}/;

const newVerticalCss = `/* ── VERTICAL WORKFLOW ────────────────────────────── */
#workflow { background: var(--dark); padding: 120px 0; font-family: var(--body); color: #fff; overflow: hidden; }
.vwf-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
.vwf-header { text-align: center; margin-bottom: 80px; }
.vwf-label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 40px; margin-bottom: 24px; color: rgba(255,255,255,0.7); text-transform: uppercase; }
.vwf-label-dot { width: 6px; height: 6px; background: #fff; border-radius: 50%; }
.vwf-header h2 { font-family: var(--display); font-size: clamp(36px, 5vw, 56px); font-weight: 700; margin-bottom: 20px; color: #fff; }
.vwf-header p { font-size: 16px; color: rgba(255,255,255,0.7); max-width: 600px; margin: 0 auto; line-height: 1.6; }

.vwf-timeline { position: relative; padding: 40px 0; }
.vwf-line-bg { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.1); transform: translateX(-50%); z-index: 1; }
.vwf-progress { position: absolute; left: 50%; top: 0; width: 2px; background: linear-gradient(180deg, transparent 0%, #3b82f6 50%, #a855f7 100%); transform: translateX(-50%); z-index: 2; height: 0%; }

.vwf-item { position: relative; display: flex; align-items: center; z-index: 3; padding: 24px; border-radius: 40px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); margin-bottom: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); }
.vwf-item.active { background: #ffffff; border-color: #ffffff; box-shadow: 0 24px 48px rgba(0,0,0,0.3); }

.vwf-left { flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 24px; padding-right: 60px; }
.vwf-icon-box { width: 64px; height: 64px; border-radius: 20px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 24px; color: rgba(255,255,255,0.6); transition: all 0.5s ease; border: 1px solid rgba(255,255,255,0.1); }
.vwf-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.6); transition: all 0.5s ease; border: 1px solid rgba(255,255,255,0.1); }

.vwf-center { width: 24px; display: flex; justify-content: center; align-items: center; }
.vwf-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--dark); border: 4px solid rgba(255,255,255,0.2); transition: all 0.5s ease; position: relative; z-index: 10; box-shadow: 0 0 0 6px var(--dark); }

.vwf-right { flex: 1; padding-left: 60px; text-align: left; }
.vwf-right h4 { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; transition: all 0.5s ease; }
.vwf-right p { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.7; margin: 0; transition: all 0.5s ease; }

/* Active State Enhancements */
.vwf-item.active .vwf-icon-box { background: var(--dark); color: #fff; border-color: var(--dark); transform: scale(1.05); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
.vwf-item.active .vwf-num { background: #f1f5f9; border-color: #e2e8f0; color: var(--dark); }
.vwf-item.active .vwf-dot { border-color: #3b82f6; background: #fff; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2), 0 0 0 10px #ffffff; }
.vwf-item.active .vwf-right h4 { color: var(--dark); }
.vwf-item.active .vwf-right p { color: #475569; }

@media (max-width: 768px) {
  .vwf-line-bg, .vwf-progress { left: 40px; }
  .vwf-item { flex-direction: column; align-items: flex-start; padding: 24px; }
  .vwf-left { width: 100%; justify-content: flex-start; padding-right: 0; margin-bottom: 24px; gap: 16px; padding-left: 60px; }
  .vwf-center { position: absolute; left: 28px; top: 48px; }
  .vwf-right { padding-left: 60px; }
}
`;

if(oldVerticalCss.test(html)) {
  html = html.replace(oldVerticalCss, newVerticalCss);
  fs.writeFileSync(indexPath, html);
  console.log('Blue/White theme applied to vertical workflow.');
} else {
  console.log('Regex did not match.');
}
