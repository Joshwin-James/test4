const fs = require('fs');

const services = [
  // Taxation & Compliance
  { name: 'Income Tax Filing', url: 'income-tax-filing.html', cat: 'Taxation & Compliance', img: 'service_income_tax_1783096755613.png', desc: 'ITR filing for individuals, HUFs, firms and corporates with complete tax planning advisory. Maximise deductions, minimise liability — legally and accurately.' },
  { name: 'ROC Compliance', url: 'roc-compliance.html', cat: 'Taxation & Compliance', img: 'service_audit_1783096977302.png', desc: 'Annual returns, board resolutions, statutory filings and MCA compliance — fully managed so you avoid penalties and stay legally compliant year-round.' },
  { name: 'PAN / TAN Services', url: 'pan-tan-services.html', cat: 'Taxation & Compliance', img: 'service_income_tax_1783096755613.png', desc: 'New PAN application, PAN correction, TAN registration and TAN corrections for individuals, firms and companies. Fast and accurate processing.' },
  { name: 'Digital Signature', url: 'digital-signature.html', cat: 'Taxation & Compliance', img: 'service_company_reg_1783096849663.png', desc: 'Class 2 and Class 3 Digital Signature Certificate issuance for MCA filings, GST registrations, income tax submissions and e-tendering.' },
  { name: 'Professional Tax', url: 'professional-tax.html', cat: 'Taxation & Compliance', img: 'service_income_tax_1783096755613.png', desc: 'Professional Tax registration and return filing for businesses and professionals across Kerala and pan-India states. Avoid penalties with timely compliance.' },
  
  // GST Services
  { name: 'GST Registration', url: 'gst-registration.html', cat: 'GST Services', img: 'service_gst_registration_1783096738448.png', desc: 'Hassle-free GST registration for all business types. We handle documentation, portal filing and GSTIN issuance — typically completed in 3 to 7 working days with zero rejections.' },
  { name: 'GST Return Filing', url: 'gst-return-filing.html', cat: 'GST Services', img: 'service_gst_registration_1783096738448.png', desc: 'Timely, accurate filing of GSTR-1, GSTR-3B, GSTR-9 and all monthly/quarterly returns. We ensure zero late fees and full reconciliation every filing cycle.' },

  // Business Registration
  { name: 'Company Registration', url: 'company-registration.html', cat: 'Business Registration', img: 'service_company_reg_1783096849663.png', desc: 'Pvt. Ltd., LLP, OPC, Partnership, Sole Proprietorship — full legal incorporation handled end-to-end from name reservation to certificate issuance.' },
  { name: 'LLP Registration', url: 'llp-registration.html', cat: 'Business Registration', img: 'service_company_reg_1783096849663.png', desc: 'Register your Limited Liability Partnership quickly and correctly. We handle the entire LLP registration process including DPIN, DSC and Form-2 filing.' },
  { name: 'Trademark Registration', url: 'trademark-registration.html', cat: 'Business Registration', img: 'service_trademark_1783096874190.png', desc: 'Protect your brand legally. Fast trademark search, filing, objection response and renewal handled by IP specialists. National and international trademarks.' },
  { name: 'MSME Registration', url: 'msme-registration.html', cat: 'Business Registration', img: 'service_msme_1783097157752.png', desc: 'Udyam registration for small and medium businesses to access government schemes, subsidies, priority lending and other MSME benefits instantly.' },
  { name: 'FSSAI Registration', url: 'fssai-registration.html', cat: 'Business Registration', img: 'service_fssai_1783097046940.png', desc: 'Food safety registration and license for restaurants, food manufacturers, traders and distributors. Basic, State and Central FSSAI licenses handled.' },
  { name: 'Import Export Code', url: 'import-export-code.html', cat: 'Business Registration', img: 'service_iec_1783097068597.png', desc: 'IEC registration from DGFT for businesses entering the international trade market. Required for import/export of goods and services across borders.' },
  { name: 'Startup Compliance', url: 'startup-compliance.html', cat: 'Business Registration', img: 'service_company_reg_1783096849663.png', desc: 'Complete compliance package for new startups — from incorporation and DPIIT recognition to first-year GST, IT filing and ROC compliance.' },

  // Accounting & Advisory
  { name: 'Accounting & Bookkeeping', url: 'accounting-bookkeeping.html', cat: 'Accounting & Advisory', img: 'service_accounting_1783096890046.png', desc: 'Comprehensive bookkeeping, financial statements, monthly MIS reports and annual accounts finalization. Tally, QuickBooks and cloud accounting supported.' },
  { name: 'Internal Audit', url: 'internal-audit.html', cat: 'Accounting & Advisory', img: 'service_audit_1783096977302.png', desc: 'Comprehensive internal audits to strengthen financial controls, identify risks and improve operational accuracy. Detailed audit reports with actionable insights.' },
  { name: 'Statutory Audit', url: 'statutory-audit.html', cat: 'Accounting & Advisory', img: 'service_audit_1783096977302.png', desc: 'Statutory audit as mandated under the Companies Act for Pvt. Ltd. and LLP entities. Conducted by qualified CAs with full reporting and certification.' },
  { name: 'Tax Planning', url: 'tax-planning.html', cat: 'Accounting & Advisory', img: 'service_income_tax_1783096755613.png', desc: 'Strategic tax planning for individuals and businesses to legally minimize tax liability through optimal use of deductions, exemptions and structuring.' },
  { name: 'Business Advisory', url: 'business-advisory.html', cat: 'Accounting & Advisory', img: 'service_advisory_1783096996321.png', desc: 'Strategic business planning, fund raising, working capital management, cost optimization and growth consulting for SMEs and startups across India.' },

  // HR & Payroll
  { name: 'Payroll Processing', url: 'payroll-processing.html', cat: 'HR & Payroll Solutions', img: 'service_payroll_1783097187797.png', desc: 'Monthly payroll processing, salary structuring, PF, ESI, TDS on salary and Form-16 generation. Fully managed payroll compliance for your team.' },
  { name: 'PF & ESI Registration', url: 'pf-esi-registration.html', cat: 'HR & Payroll Solutions', img: 'service_payroll_1783097187797.png', desc: 'Complete registration and monthly return filing for Provident Fund (PF) and Employee State Insurance (ESI). Keep your workforce compliant.' },
  { name: 'TDS on Salary (Form-16)', url: 'tds-salary.html', cat: 'HR & Payroll Solutions', img: 'service_payroll_1783097187797.png', desc: 'Accurate TDS deductions on employee salaries, timely deposit to government accounts, and generation of Form-16 for all employees.' }
];

const template = fs.readFileSync('service_template.html', 'utf-8');

services.forEach(s => {
  let content = template
    .replace(/\{\{SERVICE_NAME\}\}/g, s.name)
    .replace(/\{\{CATEGORY\}\}/g, s.cat)
    .replace(/\{\{IMAGE\}\}/g, s.img)
    .replace(/\{\{URL\}\}/g, s.url)
    .replace(/\{\{HERO_DESC\}\}/g, s.desc)
    .replace(/\{\{SEO_TITLE\}\}/g, `${s.name} in Kerala`)
    .replace(/\{\{SEO_DESC\}\}/g, s.desc);
    
  fs.writeFileSync(s.url, content);
  console.log(`Generated ${s.url}`);
});
