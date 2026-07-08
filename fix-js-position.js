const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The JS text is everything before "<!DOCTYPE html>"
const docTypeIndex = html.indexOf('<!DOCTYPE html>');
if (docTypeIndex > 0) {
    const rawJs = html.substring(0, docTypeIndex);
    html = html.substring(docTypeIndex);
    
    // Now insert rawJs into the script tag at the bottom
    const insertPoint = html.lastIndexOf('// MP ASSISTANT CHATBOT');
    
    if(insertPoint > -1) {
        html = html.substring(0, insertPoint) + rawJs + '\n' + html.substring(insertPoint);
        fs.writeFileSync(indexPath, html);
        console.log('Fixed JS position.');
    } else {
        console.log('Could not find insert point.');
    }
} else {
    console.log('No raw JS at top found.');
}
