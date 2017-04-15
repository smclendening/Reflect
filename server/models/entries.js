const { db } = require('../../db/config.js');

module.exports.new = (userId, audioId) => {
  return db.one(
    'INSERT INTO entries\
    (user_id, audio_id)\
    VALUES ($1, $2)\
    RETURNING entry_id',
    [userId, audioId])
}

module.exports.findByUserId = (userId) => {
  return db.manyOrNone('SELECT text, entries.entry_id, entries.created FROM entry_text INNER JOIN entries\
  ON entry_text.entry_id = entries.entry_id\
  WHERE entries.user_id = $1', [userId])
}

