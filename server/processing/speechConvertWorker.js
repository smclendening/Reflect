const cron = require('node-cron');
const Audio = require('../models/audio.js');
const convertToText = require('./processing.js');

module.exports = cron.schedule('15 * * * * *', () => {
  console.log('Speech Convert Worker: running...');
  Audio.findNotProcessed()
    .then((files) => {
      console.log('SCW: Unprocessed audio files: ', files);
      files.forEach((file) => {
        convertToText(file.audio_id, file.local_path, file.entry_id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}, false);
