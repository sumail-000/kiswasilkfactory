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

// Get product tags from lib/products.ts to assign accurate categories
const productsFile = path.resolve(__dirname, '../lib/products.ts');
let productTagsMap = new Map();
if (fs.existsSync(productsFile)) {
  const content = fs.readFileSync(productsFile, 'utf8');
  // Simple regex to parse PRODUCTS array
  const productRegex = /slug:\s*"([^"]+)",[\s\S]*?tags:\s*\[([\s\S]*?)\]/g;
  let match;
  while ((match = productRegex.exec(content)) !== null) {
    const slug = match[1];
    const tags = match[2].split(',').map(t => t.trim().replace(/"/g, '')).filter(Boolean);
    productTagsMap.set(slug, tags);
  }
}

// Hash all baseline images (factory, products, assets)
const fileHashMap = new Map(); // MD5 -> details { relPath, type, info }

const factoryFiles = getFilesRecursively(path.join(publicDir, 'factory'));
factoryFiles.forEach(filePath => {
  const relPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
  const hash = getMd5(filePath);
  // Extract step number
  const stepMatch = relPath.match(/\/factory\/step(\d+)\//);
  const stepNum = stepMatch ? parseInt(stepMatch[1]) : 0;
  fileHashMap.set(hash, { relPath, type: 'factory', stepNum });
});

const productFiles = getFilesRecursively(path.join(publicDir, 'products'));
productFiles.forEach(filePath => {
  const relPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
  const hash = getMd5(filePath);
  // Extract product slug
  const slugMatch = relPath.match(/\/products\/([^\/]+)\//);
  const slug = slugMatch ? slugMatch[1] : '';
  fileHashMap.set(hash, { relPath, type: 'product', slug });
});

const assetFiles = getFilesRecursively(path.join(publicDir, 'assets'));
assetFiles.forEach(filePath => {
  const relPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
  const hash = getMd5(filePath);
  fileHashMap.set(hash, { relPath, type: 'asset' });
});

// Classify each of the 91 gallery images
const items = [];
for (let num = 1; num <= 91; num++) {
  const name = `img${num}.jpeg`;
  const filePath = path.join(galleryDir, name);
  if (!fs.existsSync(filePath)) continue;

  const hash = getMd5(filePath);
  const match = fileHashMap.get(hash);

  let label = '';
  let cat = ['all'];
  let ask = false;

  if (match) {
    if (match.type === 'factory') {
      const step = match.stepNum;
      if (step >= 1 && step <= 3) {
        label = `Yarn Preparation — Detail ${num}`;
        cat.push('factory');
      } else if (step === 4 || step === 5) {
        label = `Weaving Setup & Loom Warp — Detail ${num}`;
        cat.push('factory');
      } else if (step === 6) {
        label = `Power Loom Weaving Area — View ${num}`;
        cat.push('factory');
      } else if (step >= 7 && step <= 9) {
        label = `Fabric Checking & Calendering — Detail ${num}`;
        cat.push('factory', 'dyeing', 'printing');
        ask = true; // processing fabric, good for B2B whatsapp questions
      } else if (step >= 10 && step <= 12) {
        label = `Finished Fabric Warehousing & Packing — Detail ${num}`;
        cat.push('packing', 'rolls');
      }
    } else if (match.type === 'product') {
      const slug = match.slug;
      const cleanName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      label = `${cleanName} — Close-up Detail`;
      cat.push('textures');
      ask = true;

      // Get tags from product library to map categories (Dyeing, Printing, Embroidery, Heavy Work, etc.)
      const tags = productTagsMap.get(slug) || [];
      tags.forEach(tag => {
        const lower = tag.toLowerCase();
        if (lower === 'dyeing') cat.push('dyeing');
        else if (lower === 'printing') cat.push('printing');
        else if (lower === 'embroidery') cat.push('embroidery');
        else if (lower === 'heavy work') cat.push('embroidery'); // map heavy work to embroidery tab
        else if (lower === 'lining') cat.push('textures');
      });
    } else {
      // asset type
      label = `Curated Fabric Display — View ${num}`;
      cat.push('rolls', 'textures');
      ask = true;
    }
  } else {
    // No exact duplicate, fall back to numerical ranges based on gallery structure
    if (num === 1) {
      label = "Kiswa Mill Production Floor Overview";
      cat.push("factory");
    } else if (num === 30) {
      label = "Power Loom Weaving Machinery Row";
      cat.push("factory");
    } else if (num === 60) {
      label = "Bulk Shipment Rolls Ready for Packing";
      cat.push("packing", "rolls");
    } else if (num >= 2 && num <= 12) {
      label = `Yarn Spinning & Threading Area — Setup ${num}`;
      cat.push('factory');
    } else if (num >= 13 && num <= 29) {
      label = `Power Loom Weaving Process — Detail ${num}`;
      cat.push('factory');
    } else if (num >= 31 && num <= 49) {
      label = `Weaving & Loom Section — View ${num}`;
      cat.push('factory');
    } else if (num >= 50 && num <= 59) {
      label = `Fabric Washing & Wet Preprocessing — Detail ${num}`;
      cat.push('dyeing', 'printing', 'textures');
      ask = true;
    } else if (num >= 61 && num <= 79) {
      label = `Warehouse Finished Fabric Stock rolls — ${num}`;
      cat.push('packing', 'rolls');
    } else {
      label = `Bales & Shipping Dispatch Loading — Batch ${num}`;
      cat.push('packing', 'rolls');
    }
  }

  items.push({ src: `/gallery/${name}`, label, cat, ask });
}

// Write the compiled array into a local typescript file so we can view/use it directly
const tsCode = `export type GalleryItem = {
  src: string;
  label: string;
  cat: string[];
  ask: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../lib/gallery-items.ts'), tsCode);
console.log(`Successfully compiled and categorized ${items.length} images into lib/gallery-items.ts!`);
