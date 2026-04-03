const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function fixUrls(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixUrls(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('http://localhost:5000')) {
        // Replace all instances
        const newContent = content.replace(/http:\/\/localhost:5000/g, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Fixed URLs in: ${file}`);
      }
    }
  }
}

console.log("Starting to fix localhost URLs for deployment...");
try {
  fixUrls(directoryPath);
  console.log("🎉 Successfully removed hardcoded localhost references! Ready for deployment.");
} catch (error) {
  console.error("Error:", error.message);
}
