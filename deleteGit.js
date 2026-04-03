const fs = require('fs');
const path = require('path');

const gitPath = path.join(__dirname, 'frontend', '.git');

try {
  if (fs.existsSync(gitPath)) {
    fs.rmSync(gitPath, { recursive: true, force: true });
    console.log("✅ Successfully deleted the hidden frontend/.git folder!");
  } else {
    console.log("The folder does not exist or was already deleted.");
  }
} catch (err) {
  console.error("Error deleting folder:", err.message);
}
