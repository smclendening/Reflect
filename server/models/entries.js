const { db } = require('../../db/config.js');

module.exports.findByUserId = (userId) => {
  return db.manyOrNone('SELECT text, entries.entry_id, entries.created FROM entry_text INNER JOIN entries\
  ON entry_text.entry_id = entries.entry_id\
  WHERE entries.user_id = $1', [userId])
}

