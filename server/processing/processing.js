const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const path = require('path');
const EntryText = require('../models/entry-text.js');
const Audio = require('../models/audio.js');

const speechToText = new SpeechToTextV1({
  username: process.env.SPEECH_USERNAME,
  password: process.env.SPEECH_PASSWORD
});

const createEntryFromText = (watsonResponse) => {
  let entry = '';

  watsonResponse.results.forEach((result) => {
    entry += `${result.alternatives[0].transcript}. `;
  });

  return entry.replace(/%HESITATION/g, '...');
};

module.exports = (audioId, filePath, entryId) => {
  const params = {
    // TODO: Change file to correct filePath depending on where files are stored
    audio: fs.createReadStream(path.resolve(__dirname, `files/${filePath}`)),
    content_type: 'audio/wav',
    continuous: true,
    model: 'en-US_NarrowbandModel'
  };

  speechToText.recognize(params, (err, res) => {
    if (err) {
      return console.log(err);
    }
    const entryText = createEntryFromText(res);
    // TODO: figure out with Terence how we will access entryId from DB
    return EntryText.new(entryId, entryText)
      .then(() => {
        Audio.update(audioId, 'is_processed', true);
      });
  });
};
