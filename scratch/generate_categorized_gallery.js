const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../lib/products.ts');
const galleryItemsFilePath = path.resolve(__dirname, '../lib/gallery-items.ts');

if (!fs.existsSync(productsFilePath)) {
  console.error("products.ts not found!");
  process.exit(1);
}

// Read products.ts
const content = fs.readFileSync(productsFilePath, 'utf8');

// We will use a regex to extract the PRODUCTS array blocks.
// Each product is an object in the PRODUCTS array.
// Let's capture the blocks between { and } in the PRODUCTS array.
const productsData = [];

// A more robust way to parse the TS file:
// We can extract all product objects by finding the fields slug, name, images
const slugRegex = /slug:\s*"([^"]+)"/g;
const nameRegex = /name:\s*"([^"]+)"/g;
const imagesRegex = /images:\s*\[([\s\S]*?)\]/g;

// Let's parse the file content sequentially by scanning for product blocks
// Since it's a well-formatted TS file, each product is inside the array.
// We can split the file by the products array items.
const arrayMatch = content.match(/export const PRODUCTS: Product\[\] = \[([\s\S]*?)\];/);
if (!arrayMatch) {
  console.error("Could not find PRODUCTS array in products.ts!");
  process.exit(1);
}

const productsBlock = arrayMatch[1];
// Split the block into individual product blocks using a regex that splits on outer curly braces
// A simple split by "}," can work since each product ends with a comma and newline.
const rawProductBlocks = productsBlock.split(/\n\s*\},/);

rawProductBlocks.forEach((block) => {
  const slugM = block.match(/slug:\s*"([^"]+)"/);
  const nameM = block.match(/name:\s*"([^"]+)"/);
  const imagesM = block.match(/images:\s*\[([\s\S]*?)\]/);

  if (slugM && nameM && imagesM) {
    const slug = slugM[1];
    const name = nameM[1];
    // Clean and split images
    const imagesStr = imagesM[1];
    const images = imagesStr
      .split(',')
      .map((img) => img.trim().replace(/"/g, '').replace(/'/g, ''))
      .filter((img) => img.length > 0);

    productsData.push({ slug, name, images });
  }
});

console.log(`Parsed ${productsData.length} products from products.ts.`);

// Category mapping helper
function getCategory(slug) {
  const rawSilks = ['special-dull-raw-silk', 'raw-silk-shine', 'korean-raw-silk', 'tussel-or-indian-silk', 'oxe-silk'];
  const chiffonCrinkles = ['30d-bemberg-crinkle', '40d-red-stone-crinkle', '50d-georgette-chiffon'];
  const fineSilks = ['75d-medium-silk', '75d-bright-russian-grip', 'sheesha-silk', 'moseleen-or-thai-silk', 'poly-2-tone'];
  const organzaNets = ['poly-organza', 'jaweria-net-fabric'];
  const printsSublimations = ['apple-silk-poly', 'poly-munar', 'poly-lawn-for-sublimation-print'];
  const linings = ['dull-resham-cotton', 'bright-resham-cotton', 'dull-pk-lining', 'bright-pk-lining'];

  if (rawSilks.includes(slug)) return 'raw-silk';
  if (chiffonCrinkles.includes(slug)) return 'chiffon-crinkle';
  if (fineSilks.includes(slug)) return 'fine-silk';
  if (organzaNets.includes(slug)) return 'organza-net';
  if (printsSublimations.includes(slug)) return 'prints-sublimation';
  if (linings.includes(slug)) return 'lining';

  return 'raw-silk'; // fallback
}

// Generate the new GALLERY_ITEMS list
const galleryItems = [];

productsData.forEach((product) => {
  const category = getCategory(product.slug);
  
  product.images.forEach((imgSrc, index) => {
    // Generate professional B2B-friendly labels based on image index
    let detailLabel = '';
    switch (index) {
      case 0:
        detailLabel = `${product.name} — Premium Fabric Roll`;
        break;
      case 1:
        detailLabel = `${product.name} — Fine Texture Close-up`;
        break;
      case 2:
        detailLabel = `${product.name} — Soft Drape & Fall`;
        break;
      case 3:
      default:
        detailLabel = `${product.name} — Finished Quality Material`;
        break;
    }

    galleryItems.push({
      src: imgSrc,
      label: detailLabel,
      // Map to 'all' and the specific category
      cat: ['all', category],
      // Let's make the main images (index 0) askable, or all askable
      ask: index === 0 || index === 2,
      slug: product.slug,
    });
  });
});

// Write to gallery-items.ts
const tsCode = `export type GalleryItem = {
  src: string;
  label: string;
  cat: string[];
  ask: boolean;
  slug: string;
};

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(galleryItems, null, 2)};
`;

fs.writeFileSync(galleryItemsFilePath, tsCode);
console.log(`Successfully generated ${galleryItems.length} categorized fabric items in lib/gallery-items.ts!`);
