const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. UPDATE ICONS
const oldChatBtnRegex = /<svg class="ico-chat".*?<\/svg>/;
const robotSvgBtn = `<svg class="ico-chat" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a1.5 1.5 0 00-1.5-1.5H19V8c0-1.1-.9-2-2-2h-3.5V4.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V6H7c-1.1 0-2 .9-2 2v2H3.5a1.5 1.5 0 00-1.5 1.5v3c0 .83.67 1.5 1.5 1.5H5v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h1.5c.83 0 1.5-.67 1.5-1.5v-3zM8.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 18c-2.4 0-4.5-1.5-5.5-3.5h11c-1 2-3.1 3.5-5.5 3.5z"/></svg>`;
html = html.replace(oldChatBtnRegex, robotSvgBtn);

const oldAvatarRegex = /<svg class="chat-av-svg".*?<\/svg>/;
const robotSvgAv = `<svg class="chat-av-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a1.5 1.5 0 00-1.5-1.5H19V8c0-1.1-.9-2-2-2h-3.5V4.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V6H7c-1.1 0-2 .9-2 2v2H3.5a1.5 1.5 0 00-1.5 1.5v3c0 .83.67 1.5 1.5 1.5H5v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h1.5c.83 0 1.5-.67 1.5-1.5v-3zM8.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 18c-2.4 0-4.5-1.5-5.5-3.5h11c-1 2-3.1 3.5-5.5 3.5z"/></svg>`;
html = html.replace(oldAvatarRegex, robotSvgAv);

// 2. UPDATE CHATBOT INTELLIGENCE LOGIC
const oldJsRegex = /const KB = \{[\s\S]*?function chatReply\(msg\)\{[\s\S]*?\}/m;

const newJs = `const intentMap = [
  { keywords: ['gst registration', 'register gst', 'new gst', 'apply gst', 'gst certificate'], reply: 'GST Registration typically takes 3–7 working days. You need PAN, Aadhaar, bank statement, address proof, and business proof. We handle everything for you! 📋' },
  { keywords: ['gst return', 'file gst', 'gstr', 'late fee', 'gst filing', 'tax return'], reply: 'We file GSTR-1, GSTR-3B, GSTR-9 and all other returns on time. Monthly and quarterly options available with full reconciliation. No late fees guaranteed! ✅' },
  { keywords: ['income tax', 'itr', 'tax return', 'file tax', 'tds'], reply: 'We file ITR for individuals, HUFs, firms, and companies. Our experts ensure maximum deductions and minimum tax liability — completely legal. 💼' },
  { keywords: ['company', 'pvt ltd', 'incorporation', 'sole proprietor', 'partnership', 'register business'], reply: 'We register Pvt. Ltd., LLP, OPC, Partnership, and Sole Proprietorship firms. Full end-to-end service from name approval to incorporation certificate. 🏢' },
  { keywords: ['llp', 'limited liability'], reply: 'LLP Registration includes DPIN, DSC, LLP Agreement drafting, and MCA Form-2 filing. Usually completed in 7–14 working days. 📝' },
  { keywords: ['trademark', 'brand', 'logo registration', 'copyright', 'ipr'], reply: 'We handle Trademark Search, Application Filing, Objection Response, and Renewal. Protect your brand legally! ™️ Typically takes 18–24 months for full registration.' },
  { keywords: ['msme', 'udyam', 'ssi'], reply: 'MSME/Udyam Registration gives you access to government schemes, priority lending, and subsidies. We get it done in 1 day! 🏭' },
  { keywords: ['iec', 'import', 'export', 'trade'], reply: 'Import Export Code (IEC) from DGFT is mandatory for international trade. We handle the entire application. Usually done in 2–3 working days. 🌐' },
  { keywords: ['fssai', 'food license', 'food registration', 'restaurant'], reply: 'FSSAI Registration/License is required for all food businesses. We handle Basic, State, and Central FSSAI licenses. 🍽️' },
  { keywords: ['audit', 'internal audit', 'statutory', 'stock audit', 'ca'], reply: 'We conduct Internal Audits, Statutory Audits, Stock Audits, and GST Audits. Our CA team provides detailed reports with actionable recommendations. 🔍' },
  { keywords: ['accounting', 'bookkeeping', 'tally', 'mis report', 'accounts'], reply: 'We offer full bookkeeping, Tally/cloud accounting, MIS reports, payroll processing, and year-end account finalization. 📒' },
  { keywords: ['payroll', 'salary processing', 'pf', 'esi', 'provident fund'], reply: 'Our payroll services cover salary processing, PF & ESI, TDS on salary, Form-16 generation, and full compliance. 💰' },
  { keywords: ['advisory', 'consulting', 'fund raising', 'working capital', 'startup strategy'], reply: 'Our Business Advisory covers strategic planning, fund raising, working capital management, and growth consulting for SMEs and startups. 🧭' },
  { keywords: ['fee', 'cost', 'price', 'charge', 'much is', 'pricing'], reply: 'Our fees depend on the specific service and business size. We offer competitive, transparent pricing. Book a free consultation for a custom quote! 📞' },
  { keywords: ['contact', 'call', 'phone', 'number', 'email', 'address', 'location', 'where', 'reach', 'office'], reply: '📞 Phone: +91 96339 68020 | 0474 2991293\\n✉️ Email: info@mptaxassociates.com\\n📍 Kottiyam, Kollam, Kerala\\n🕐 Mon-Sat: 9AM - 6PM' },
  { keywords: ['professional tax', 'pt registration'], reply: 'Professional Tax registration and return filing for businesses and employees. We handle PT compliance pan-India. 💼' },
  { keywords: ['startup', 'new business'], reply: 'Our Startup Compliance package covers incorporation, DPIIT recognition, first-year GST, ROC, and tax compliance. Perfect for new businesses! 🚀' },
  { keywords: ['dsc', 'digital signature', 'class 3'], reply: 'We provide Class 2 & Class 3 DSC for MCA filings, GST, income tax, and e-tendering. Quick delivery. 🔐' },
  { keywords: ['pan', 'tan', 'nsdl', 'pan card'], reply: 'We assist with new PAN applications, PAN corrections, TAN registration, and TAN corrections for all entity types. 📄' }
];

function chatReply(msg){
  const m = msg.toLowerCase();
  
  // Greetings
  if (m.match(/\\b(hi|hello|hey|greetings|namaste)\\b/)) {
    return "Hello! 👋 I'm the MP Tax AI Assistant. How can I help you today? I can answer questions about GST, Tax, Company Incorporation, and more.";
  }
  
  // Gratitude
  if (m.match(/\\b(thanks|thank you|thx|ok|okay)\\b/)) {
    return "You're very welcome! Let me know if you need help with anything else.";
  }
  
  // Advanced keyword array mapping (much more intelligent than simple strings)
  for (const intent of intentMap) {
    if (intent.keywords.some(kw => m.includes(kw))) {
      return intent.reply;
    }
  }
  
  // Contextual fallback based on question words
  if (m.includes('how') || m.includes('what') || m.includes('why') || m.includes('when')) {
    return "That's a great question! Tax and compliance rules can be complex and specific to your business. To give you the most accurate advice, I recommend speaking directly with our experts at +91 96339 68020.";
  }
  
  // Randomized intelligent fallbacks
  const fallbacks = [
    "I'm an automated AI assistant and I might not have the full context for that. Could you try rephrasing, or would you like our contact details?",
    "I'd love to help with that! However, for specialized or detailed advice, it's best to consult our senior CA team directly at info@mptaxassociates.com.",
    "Interesting! While I'm still learning about that specific topic, our human consultants can definitely help. Call us at +91 96339 68020 for a free consultation."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}`;

if (html.match(oldJsRegex)) {
  html = html.replace(oldJsRegex, newJs);
  console.log("Chatbot intelligence upgraded!");
} else {
  console.log("Failed to match JS regex for chatbot.");
}

fs.writeFileSync(indexPath, html);
