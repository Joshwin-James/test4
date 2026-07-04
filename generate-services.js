const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The regex matches: <div class="svc-card sling-up">\s*<h4 class="svc-card-title">Title</h4>\s*<p class="svc-card-desc">Desc</p>\s*<div class="svc-card-arrow">↗</div>\s*</div>
const cardRegex = /<div class="svc-card sling-up">([\s\S]*?)<h4 class="svc-card-title">(.*?)<\/h4>([\s\S]*?)<\/div>/g;

const templateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - MP Tax Associates</title>
  <meta name="description" content="Professional {{TITLE}} services by MP Tax Associates in India.">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300..800&display=swap');
    :root {
      --bg-primary: #FFFFFF;
      --bg-secondary: #F8F9FA;
      --text-primary: #0F172A;
      --text-muted: #64748B;
      --border-subtle: rgba(15, 23, 42, 0.1);
      --dark: #0F172A;
      --orange: #f97316;
      --display: 'Playfair Display', serif;
      --sans: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: var(--sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.6; }
    
    /* Simple Navbar */
    .nav { position: fixed; top: 0; left: 0; width: 100%; height: 80px; background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; padding: 0 48px; z-index: 100; justify-content: space-between; }
    .nav-logo { font-family: var(--display); font-size: 24px; font-weight: 700; color: var(--dark); text-decoration: none; }
    .nav-back { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--dark); text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .nav-back:hover { color: var(--orange); }
    
    /* Hero */
    .srv-hero { padding: 200px 48px 120px; background: #fff; border-bottom: 1px solid var(--border-subtle); text-align: center; }
    .srv-hero-title { font-family: var(--display); font-size: clamp(40px, 6vw, 72px); line-height: 1.1; color: var(--dark); max-width: 800px; margin: 0 auto 24px; }
    .srv-hero-desc { font-size: 20px; color: var(--text-muted); max-width: 600px; margin: 0 auto; }
    
    /* Content */
    .srv-content { max-width: 800px; margin: 80px auto; padding: 0 24px; }
    .srv-content h2 { font-family: var(--display); font-size: 32px; color: var(--dark); margin: 40px 0 20px; }
    .srv-content p { margin-bottom: 24px; font-size: 16px; color: var(--text-muted); }
    .srv-content ul { margin-bottom: 24px; padding-left: 20px; color: var(--text-muted); }
    .srv-content li { margin-bottom: 10px; }
    
    .cta-box { background: var(--dark); color: #fff; padding: 60px; border-radius: 16px; text-align: center; margin: 80px 0; }
    .cta-box h3 { font-family: var(--display); font-size: 32px; margin-bottom: 16px; }
    .cta-box p { color: rgba(255,255,255,0.7); margin-bottom: 32px; font-size: 18px; }
    .cta-btn { display: inline-block; background: #fff; color: var(--dark); padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; transition: 0.3s ease; }
    .cta-btn:hover { background: var(--orange); color: #fff; }
    
    @media(max-width: 768px) {
      .nav { padding: 0 24px; }
      .srv-hero { padding: 140px 24px 80px; }
      .cta-box { padding: 40px 24px; }
    }
  </style>
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">MP Tax Associates</a>
    <a href="index.html#services" class="nav-back">← Back to Services</a>
  </nav>

  <header class="srv-hero">
    <h1 class="srv-hero-title">{{TITLE}}</h1>
    <p class="srv-hero-desc">Expert {{TITLE}} services tailored for your business needs.</p>
  </header>

  <main class="srv-content">
    <h2>Overview</h2>
    <p>Navigating the complexities of <strong>{{TITLE}}</strong> is essential for businesses operating in today's highly regulated environment. At MP Tax Associates, we provide end-to-end support to ensure complete compliance, accuracy, and strategic advantage.</p>
    
    <h2>What We Offer</h2>
    <ul>
      <li>Comprehensive consultation and strategy planning.</li>
      <li>Preparation, verification, and filing of all required documentation.</li>
      <li>Ongoing support and representation before authorities if required.</li>
      <li>Proactive updates on regulatory changes affecting your industry.</li>
    </ul>

    <p>Our multidisciplinary team of Chartered Accountants, Tax Practitioners, and Legal Experts ensures that every aspect of your {{TITLE}} is handled with meticulous attention to detail and unwavering confidentiality.</p>

    <div class="cta-box">
      <h3>Ready to Streamline Your Compliance?</h3>
      <p>Schedule a free consultation with our experts today.</p>
      <a href="index.html#contact" class="cta-btn">Book Consultation</a>
    </div>
  </main>

</body>
</html>
`;

let match;
let newHtml = html;

// We will replace <div class="svc-card sling-up"> with <a href="..." class="svc-card sling-up">
// and the corresponding closing </div> with </a>
while ((match = cardRegex.exec(html)) !== null) {
  const fullMatch = match[0];
  const beforeTitle = match[1];
  const title = match[2];
  const afterTitle = match[3]; // contains desc and arrow and closing div
  
  // Create filename from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filename = `service-${slug}.html`;
  
  // Generate file
  const fileContent = templateHtml.replace(/\{\{TITLE\}\}/g, title);
  fs.writeFileSync(path.join(__dirname, filename), fileContent);
  
  // Replace in index.html
  // Note: the fullMatch ends with </div> which we need to replace with </a>
  let replacement = `<a href="${filename}" class="svc-card sling-up" style="text-decoration:none;display:block;">${beforeTitle}<h4 class="svc-card-title">${title}</h4>${afterTitle}`;
  // Replace the LAST </div> in replacement with </a>
  const lastDivIndex = replacement.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    replacement = replacement.substring(0, lastDivIndex) + '</a>' + replacement.substring(lastDivIndex + 6);
  }
  
  newHtml = newHtml.replace(fullMatch, replacement);
}

fs.writeFileSync(indexPath, newHtml);
console.log('Successfully generated service pages and updated index.html');
