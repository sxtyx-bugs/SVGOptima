const { db } = require('../config/database');
const { tierConfig } = require('./rateLimiter');

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function usageCheck(req, res, next) {
  // Only enforce for authenticated users; anonymous uses IP-based rate limit
  if (!req.user) return next();
  const tier = req.user.tier || 'free';
  if (tier === 'pro') return next();
  const today = getToday();
  const userId = req.user.id;
  const row = db
    .prepare('SELECT files_optimized, bytes_processed FROM usage_tracking WHERE user_id = ? AND date = ?')
    .get(userId, today);
  const currentFiles = row ? row.files_optimized : 0;
  const limit = tier === 'premium' ? 500 : 50;
  if (currentFiles >= limit) {
    return res.status(429).json({
      error: `Daily optimization limit reached for ${tier} tier. Upgrade for higher limits.`,
    });
  }
  return next();
}

function usageIncrement(bytesProcessed) {
  return (req, _res, next) => {
    if (!req.user) return next();
    const today = getToday();
    const userId = req.user.id;
    const existing = db
      .prepare('SELECT id, files_optimized, bytes_processed FROM usage_tracking WHERE user_id = ? AND date = ?')
      .get(userId, today);
    if (existing) {
      db.prepare(
        'UPDATE usage_tracking SET files_optimized = ?, bytes_processed = ? WHERE id = ?'
      ).run(existing.files_optimized + 1, existing.bytes_processed + bytesProcessed, existing.id);
    } else {
      db.prepare(
        'INSERT INTO usage_tracking (user_id, date, files_optimized, bytes_processed) VALUES (?, ?, ?, ?)'
      ).run(userId, today, 1, bytesProcessed);
    }
    return next();
  };
}

module.exports = { usageCheck, usageIncrement };


