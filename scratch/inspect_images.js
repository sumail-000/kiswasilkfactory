const fs = require('fs');
const path = require('path');

function inspectDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      inspectDir(fullPath);
    } else if (item.endsWith('.jpeg') || item.endsWith('.jpg') || item.endsWith('.png')) {
      console.log(`File: ${fullPath.replace(/\\/g, '/')} | Size: ${(stat.size / 1024).toFixed(1)} KB`);
    }
  }
}

console.log("--- INSPECTING PRODUCTS ---");
inspectDir('e:/silksite/public/products');
console.log("--- INSPECTING FACTORY ---");
inspectDir('e:/silksite/public/factory');
