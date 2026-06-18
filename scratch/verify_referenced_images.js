const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');

// List of files/directories to inspect for image references
const filesToInspect = [
  path.resolve(__dirname, '../lib/products.ts'),
  path.resolve(__dirname, '../lib/factory-process.ts'),
  path.resolve(__dirname, '../lib/site.ts'),
  path.resolve(__dirname, '../lib/fabrics.ts'),
];

// Helper to recursively list files in a directory
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

// Add all app pages and components to inspection list
const appFiles = getFilesRecursively(path.resolve(__dirname, '../app'))
  .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
const componentFiles = getFilesRecursively(path.resolve(__dirname, '../components'))
  .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

const allSourceFiles = [...filesToInspect, ...appFiles, ...componentFiles];

// Regular expression to find paths starting with /assets/, /products/, /factory/, or /gallery/
// followed by an image extension (.jpg, .jpeg, .png, .svg)
const imgPathRegex = /"(\/(assets|products|factory|gallery)\/[^"]+\.(jpg|jpeg|png|svg|webp))"/g;

const foundImages = new Set();
const missingImages = [];
const verifiedImages = [];

allSourceFiles.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = imgPathRegex.exec(content)) !== null) {
    foundImages.add(match[1]);
  }
});

// Also manually add any other static paths from index files if needed
console.log(`Scanning finished. Found ${foundImages.size} unique local image references in source code.`);

Array.from(foundImages).sort().forEach((imgUrl) => {
  const localPath = path.join(publicDir, imgUrl);
  if (fs.existsSync(localPath)) {
    verifiedImages.push(imgUrl);
  } else {
    missingImages.push(imgUrl);
  }
});

console.log("\n--- VERIFICATION RESULTS ---");
console.log(`Verified (Exist): ${verifiedImages.length}`);
console.log(`Missing (Do Not Exist): ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log("\n❌ MISSING IMAGES:");
  missingImages.forEach((img) => console.log(`  - ${img}`));
} else {
  console.log("\n✅ ALL referenced images exist locally in the public folder!");
}
