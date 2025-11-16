const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { cleanupScheduler } = require('./utils/fileCleanup');

dotenv.config();

const app = express();

// Basic security headers
app.use(helmet());

// CORS
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));

// JSON parsing (avoid for webhooks, handled in routes)
app.use(express.json({ limit: '2mb' }));

// Static files
const publicDir = path.join(__dirname, '..', 'public');
const clientDistDir = path.join(__dirname, '..', 'client', 'dist');

if (process.env.NODE_ENV === 'production' && fs.existsSync(clientDistDir)) {
  app.use(express.static(clientDistDir));
} else {
  app.use(express.static(publicDir));
}

// Ensure temp folders exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
const optimizedDir = path.join(__dirname, '..', 'optimized');
for (const dir of [uploadsDir, optimizedDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Global basic rate limit (per IP) as a safety net
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Routes
const authRoutes = require('./routes/auth');
const svgRoutes = require('./routes/svg');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api', svgRoutes);
app.use('/api', paymentRoutes);

// Public config for client (exposes only non-secret values)
app.get('/api/public-config', (_req, res) => {
  res.json({ razorpayKeyId: process.env.RAZORPAY_KEY_ID || '' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Fallback to index.html
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(clientDistDir, 'index.html'))) {
    return res.sendFile(path.join(clientDistDir, 'index.html'));
  }
  return res.sendFile(path.join(publicDir, 'index.html'));
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Generic error response
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Only start HTTP server if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    // eslint-disable-next-line no-console
    console.log(`${signal} received. Shutting down...`);
    server.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  ['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));

  // Start cleanup scheduler (only for non-serverless)
  cleanupScheduler();
}

module.exports = app;


