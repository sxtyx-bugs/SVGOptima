/* eslint-disable no-console */
const { db } = require('../config/database');

function init() {
  // Tables are created on import; ensure indexes and schema are present
  const row = db.prepare('SELECT name FROM sqlite_master WHERE type = ?').get('table');
  console.log('Database initialized. Example table:', row && row.name);
}

if (require.main === module) {
  init();
}

module.exports = { init };


