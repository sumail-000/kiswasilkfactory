const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const appDir = path.resolve(__dirname, '../app');
const componentsDir = path.resolve(__dirname, '../components');
const libDir = path.resolve(__dirname, '../lib');

// Helper to list all files in a directory recursively
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
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

// Find all assets in public directory
const allPublicFiles = getFilesRecursively(publicDir);
const publicImageAssets = allPublicFiles.filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp', '.ico'].includes(ext);
});

// Find all code files to search references in
const codeFiles = [
  ...getFilesRecursively(appDir),
  ...getFilesRecursively(componentsDir),
  ...getFilesRecursively(libDir)
].filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext);
});

// Read content of all code files
const codeContents = codeFiles.map(filePath => ({
  path: filePath,
  content: fs.readFileSync(filePath, 'utf8')
}));

const assetUsage = [];

publicImageAssets.forEach(fullPath => {
  // Get relative path from public directory, e.g. "/assets/silk-rolls.jpg"
  const relPath = '/' + path.relative(publicDir, fullPath).replace(/\\/g, '/');
  
  // Find where it is referenced
  const references = [];
  codeContents.forEach(code => {
    if (code.content.includes(relPath)) {
      references.push(path.basename(code.path));
    }
  });

  assetUsage.push({
    path: relPath,
    sizeKb: (fs.statSync(fullPath).size / 1024).toFixed(1),
    used: references.length > 0,
    referencedIn: references
  });
});

console.log(`=== PUBLIC ASSET ANALYSIS ===`);
console.log(`Total image/icon assets in public folder: ${publicImageAssets.length}\n`);

const usedAssets = assetUsage.filter(a => a.used);
const unusedAssets = assetUsage.filter(a => !a.used);

console.log(`--- USED ASSETS (${usedAssets.length}) ---`);
usedAssets.forEach(a => {
  console.log(`  - ${a.path} (${a.sizeKb} KB) -> Referenced in: ${a.referencedIn.join(', ')}`);
});

console.log(`\n--- UNUSED ASSETS (${unusedAssets.length}) ---`);
if (unusedAssets.length > 0) {
  unusedAssets.forEach(a => {
    console.log(`  - ${a.path} (${a.sizeKb} KB)`);
  });
} else {
  console.log("  None! Every single asset in the public folder is referenced in the code.");
}
