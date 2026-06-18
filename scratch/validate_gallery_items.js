const fs = require('fs');
const path = require('path');

const galleryItemsFile = path.resolve(__dirname, '../lib/gallery-items.ts');
if (fs.existsSync(galleryItemsFile)) {
  const { GALLERY_ITEMS } = require(galleryItemsFile);
  let multiCategoryCount = 0;
  GALLERY_ITEMS.forEach(item => {
    // filter out 'all'
    const subCats = item.cat.filter(c => c !== 'all');
    if (subCats.length > 1) {
      console.log(`❌ Item has multiple subcategories: ${item.src} -> ${subCats.join(', ')}`);
      multiCategoryCount++;
    }
  });
  if (multiCategoryCount === 0) {
    console.log("✅ Every item in lib/gallery-items.ts has EXACTLY ONE subcategory!");
  } else {
    console.log(`❌ Found ${multiCategoryCount} items with multiple subcategories.`);
  }
} else {
  console.log("File does not exist.");
}
