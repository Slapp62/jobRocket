const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, '../../frontend/dist');
const destination = path.join(__dirname, '../public');

console.log('📦 Copying frontend build...');
console.log(`   Source: ${source}`);
console.log(`   Destination: ${destination}`);

try {
  // Empty the destination directory first
  fs.emptyDirSync(destination);
  console.log('✅ Cleaned destination directory');

  // Copy all files from source to destination
  fs.copySync(source, destination);
  console.log('✅ Frontend build copied to backend/public');
} catch (error) {
  console.error('❌ Error copying build files:', error.message);
  process.exit(1);
}
