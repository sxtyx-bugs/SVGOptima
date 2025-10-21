const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { optimize } = require('svgo');
const { createRateLimiter, validateFileSize } = require('../middleware/rateLimiter');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
const optimizedDir = path.join(__dirname, '..', '..', 'optimized');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`),
});

function svgFilter(_req, file, cb) {
  if (file.mimetype === 'image/svg+xml' || file.originalname.toLowerCase().endsWith('.svg')) return cb(null, true);
  return cb(new Error('Only .svg files are allowed'));
}

// Increase multipart limit to 1GB
const upload = multer({ storage, fileFilter: svgFilter, limits: { fileSize: 1024 * 1024 * 1024 } });

router.post('/optimize-svg', createRateLimiter(), upload.single('file'), validateFileSize, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = req.file.path;
    const original = fs.readFileSync(filePath, 'utf8');
    const result = optimize(original, { multipass: true });
    if (!result || !result.data) return res.status(500).json({ error: 'Optimization failed' });
    const optimizedSvg = result.data;
    const outName = `${Date.now()}-${path.basename(req.file.filename, path.extname(req.file.filename))}.optimized.svg`;
    const outPath = path.join(optimizedDir, outName);
    fs.writeFileSync(outPath, optimizedSvg, 'utf8');
    const stats = {
      originalBytes: Buffer.byteLength(original, 'utf8'),
      optimizedBytes: Buffer.byteLength(optimizedSvg, 'utf8'),
    };
    const saved = stats.originalBytes - stats.optimizedBytes;
    const percent = stats.originalBytes > 0 ? Math.max(0, (saved / stats.originalBytes) * 100) : 0;
    return res.json({
      filename: outName,
      downloadUrl: `/api/download/${encodeURIComponent(outName)}`,
      originalBytes: stats.originalBytes,
      optimizedBytes: stats.optimizedBytes,
      percentSaved: Number(percent.toFixed(2)),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(optimizedDir, filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  fs.createReadStream(filePath).pipe(res);
});

module.exports = router;


