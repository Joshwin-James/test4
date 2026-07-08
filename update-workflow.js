const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldWorkflowHtml = /<div class="wf-steps">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const newWorkflowHtml = `<div class="wf-steps">
      <div class="wf-step on rv d1">
        <div class="wf-n">01</div>
        <div class="wf-t">Analysis & Strategy</div>
        <div class="wf-d">In-depth analysis of your business to create a clear optimization and compliance strategy.</div>
      </div>
      <div class="wf-step rv d2">
        <div class="wf-n">02</div>
        <div class="wf-t">Planning & Execution</div>
        <div class="wf-d">Delivering customer-centric business solutions and handling all registrations & legal filings.</div>
      </div>
      <div class="wf-step rv d3">
        <div class="wf-n">03</div>
        <div class="wf-t">Growth & Support</div>
        <div class="wf-d">Continuous strategic business support to ensure long-term success and seamless compliance.</div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(oldWorkflowHtml, newWorkflowHtml);

fs.writeFileSync(indexPath, html);
console.log('Replaced workflow section with 3-step approach.');
