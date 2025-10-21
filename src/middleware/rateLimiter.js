const rateLimit = require('express-rate-limit');

const ONE_GB = 1024 * 1024 * 1024;

const tierConfig = {
  free: { maxRequestsPerDay: 50, maxBytes: ONE_GB },
  premium: { maxRequestsPerDay: 500, maxBytes: ONE_GB },
  pro: { maxRequestsPerDay: Infinity, maxBytes: ONE_GB },
};

// Pre-create limiters at module load to satisfy express-rate-limit requirement
const limiters = {
  free: rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: tierConfig.free.maxRequestsPerDay,
    keyGenerator: (req) => `ip:${req.ip}`,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Daily limit reached. Please try again tomorrow.' },
  }),
  premium: rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: tierConfig.premium.maxRequestsPerDay,
    keyGenerator: (req) => `ip:${req.ip}`,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Daily limit reached. Please try again tomorrow.' },
  }),
  pro: (req, res, next) => next(),
};

function createRateLimiter() {
  return (req, res, next) => {
    const tier = (req.user && req.user.tier) || 'free';
    const middleware = limiters[tier] || limiters.free;
    return middleware(req, res, next);
  };
}

function validateFileSize(req, res, next) {
  const tier = (req.user && req.user.tier) || 'free';
  const config = tierConfig[tier] || tierConfig.free;
  if (!req.file || typeof req.file.size !== 'number') return next();
  if (req.file.size > config.maxBytes) {
    return res.status(413).json({
      error: `File exceeds ${(config.maxBytes / (1024 * 1024)).toFixed(0)}MB limit`,
    });
  }
  return next();
}

module.exports = { createRateLimiter, validateFileSize, tierConfig };


