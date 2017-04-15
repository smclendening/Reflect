const cron = require('node-cron');
const Audio = require('../models/audio.js');
const convertToText = require('./processing.js');

module.exports = cron.schedule('0,5 * * * *', () => {

  Audio.findNotProcessed()
    .then(files => {
      files.forEach(file => {
        convertToText(file.audio_id, file.audio_path, file.entry_id)
      });
    })
    .catch(error => {
      console.error(error);
    })
}, false);
 
