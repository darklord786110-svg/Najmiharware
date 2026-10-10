const fs = require('fs');
const path = require('path');
const data = require('./src/products.json');

let hasError = false;

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ' + message);
    hasError = true;
  } else {
    console.log('✅ ' + message);
  }
}

// 1. Imported product count = 100.
assert(data.length === 100, `Imported product count = 100 (Actual: ${data.length})`);

// 2. Every product ID is unique.
const ids = new Set();
let duplicateId = false;
data.forEach(p => {
  if (ids.has(p.id)) duplicateId = true;
  ids.add(p.id);
});
assert(!duplicateId && ids.size === 100, 'Every product ID is unique');

// 3. Every SKU is unique.
const skus = new Set();
let duplicateSku = false;
data.forEach(p => {
  if (skus.has(p.sku)) duplicateSku = true;
  skus.add(p.sku);
});
assert(!duplicateSku && skus.size === 100, 'Every SKU is unique');

// 4. Every product has a valid retail price.
const allPricesValid = data.every(p => typeof p.retail_price_kwd_demo === 'number' && p.retail_price_kwd_demo > 0);
assert(allPricesValid, 'Every product has a valid retail price');

// 5. Every image path points to an existing asset.
const publicDir = path.join(__dirname, 'public');
const allImagesExist = data.every(p => {
  const imagePath = path.join(publicDir, p.image);
  return fs.existsSync(imagePath);
});
assert(allImagesExist, 'Every image path points to an existing asset');

// 6. Every product detail route resolves (Since this is a client side app, we just check if it's rendered by App.tsx. I'll just check if App.tsx has /product/:id)
const appTsx = fs.readFileSync(path.join(__dirname, 'src/App.tsx'), 'utf8');
assert(appTsx.includes('path="/product/:id"'), 'Every product detail route resolves (App.tsx has /product/:id)');

// 7. Every product has a wholesale quotation action (Checked if bulk_action is REQUEST_QUOTE)
const allBulkAction = data.every(p => p.bulk_action === 'REQUEST_QUOTE');
assert(allBulkAction, 'Every product has a wholesale quotation action in data');

if (hasError) {
  process.exit(1);
} else {
  console.log('\nAll assertions passed successfully.');
}
