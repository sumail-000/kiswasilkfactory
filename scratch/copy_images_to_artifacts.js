const fs = require('fs');
const path = require('path');

const srcDir = 'e:/kiswasilkfactory/project/kiswasilkfactory/public/gallery';
const destDir = 'C:/Users/MUJEEB-UL-HASSAN/.gemini/antigravity-ide/brain/0811f825-2034-49f1-acac-267ded59ed5b';

// Let's copy a representative sample of 20 images from img2 to img21
const imagesToCopy = [];
for (let i = 2; i <= 21; i++) {
  imagesToCopy.push(`img${i}.jpeg`);
}

// Make sure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log("Copying images to artifacts directory...");
let count = 0;
imagesToCopy.forEach(img => {
  const srcPath = path.join(srcDir, img);
  const destPath = path.join(destDir, img);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${img}`);
    count++;
  } else {
    console.log(`Source does not exist: ${srcPath}`);
  }
});
console.log(`Finished copying ${count} images.`);
