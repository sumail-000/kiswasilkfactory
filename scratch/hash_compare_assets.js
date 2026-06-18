const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.resolve(__dirname, '../public');
const galleryDir = path.join(publicDir, 'gallery');

function getMd5(filePath) {
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  hash.update(buffer);
  return hash.digest('hex');
}

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

// Step 1: Hash all non-gallery images (factory, products, assets)
const otherDirs = [
  path.join(publicDir, 'factory'),
  path.join(publicDir, 'products'),
  path.join(publicDir, 'assets')
];

const fileHashMap = new Map(); // MD5 -> relative path

otherDirs.forEach(dir => {
  const files = getFilesRecursively(dir);
  files.forEach(filePath => {
    const relPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
    try {
      const hash = getMd5(filePath);
      fileHashMap.set(hash, relPath);
    } catch (e) {
      // ignore
    }
  });
});

console.log(`Hashed ${fileHashMap.size} baseline images from factory, products, and assets.`);

// Step 2: Compare each gallery image
const galleryImages = [];
for (let num = 1; num <= 91; num++) {
  const name = `img${num}.jpeg`;
  const filePath = path.join(galleryDir, name);
  if (fs.existsSync(filePath)) {
    const hash = getMd5(filePath);
    const matchedPath = fileHashMap.get(hash);
    galleryImages.push({
      num,
      name,
      matchedPath: matchedPath || null
    });
  }
}

console.log("\n=== GALLERY DUPLICATE ANALYSIS ===");
galleryImages.forEach(g => {
  if (g.matchedPath) {
    console.log(`Gallery ${g.name} is a duplicate of: ${g.matchedPath}`);
  } else {
    console.log(`Gallery ${g.name} has NO baseline duplicate.`);
  }
});
