const express = require('express');
const router = express.Router();

// No auth routes as app is stateless per requirements.
router.get('/status', (_req, res) => res.json({ auth: false }));

module.exports = router;


