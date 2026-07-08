const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenJs = `  vwfItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active"
    });
  });
    });
  }`;

const fixedJs = `  vwfItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active"
    });
  });
  }`;

// Use string replacement for safety, stripping exact whitespaces to be safe
html = html.replace(/vwfItems\.forEach\(\(item, i\) => \{\s*ScrollTrigger\.create\(\{\s*trigger: item,\s*start: "top 50%",\s*end: "bottom 50%",\s*toggleClass: "active"\s*\}\);\s*\}\);\s*\}\);\s*\}/g, 
  `vwfItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active"
    });
  });
}`);

fs.writeFileSync(indexPath, html);
console.log('Syntax error fixed.');
