const fs = require('fs');
const path = require('path');

function deleteOlderThan(dir, ms) {
  if (!fs.existsSync(dir)) return;
  const now = Date.now();
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    try {
      const stat = fs.statSync(p);
      if (now - stat.mtimeMs > ms) {
        fs.unlinkSync(p);
      }
    } catch (_) {}
  }
}

function cleanupScheduler() {
  const root = path.join(__dirname, '..', '..');
  const uploads = path.join(root, 'uploads');
  const optimized = path.join(root, 'optimized');
  const dayMs = 24 * 60 * 60 * 1000;
  setInterval(() => {
    deleteOlderThan(uploads, dayMs);
    deleteOlderThan(optimized, dayMs);
  }, 60 * 60 * 1000).unref();
}

module.exports = { cleanupScheduler };


