require('dotenv').config();
let db = null;
let Audio = null;

const audio = {
  call_id: 'CAee9eb020ed511d453aee0f8aac8c0f8b',
  remote_path: '/2010-04-01/Accounts/AC1ef0d59f0d5d4611c7953f8bc6f660ec/Recordings/RE0448c78482ac9f0805736389cdbea64c.json',
  local_path: '',
  is_processed: false,
  is_downloaded: false,
  recording_id: 'RE0448c78482ac9f0805736389cdbea64c',
  date_file_created: 'Tue, 11 Apr 2017 16:48:38 +0000'
}

beforeAll(() => {
  if (process.env.IS_ON === 'development') {
    process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  }
  Audio = require('../../server/models/audio.js');
  const dbConfig = require('../../db/config.js');
  db = dbConfig.db;
})

afterAll(() => {
  return db.one("DELETE FROM audio WHERE call_id = 'CAee9eb020ed511d453aee0f8aac8c0f8b'");
})

describe('Audio table', () => {

  let audioId = null;

  it('should have an audio table', () => {
    db.any('SELECT * FROM audio')
      .then(result => {
        expect(result).toBeDefined();
      })
  })

  it('should add an audio file to the table', () => {
    return Audio.new(audio)
      .then(audio => {
        expect(audio).toBeDefined();
      })
  })

  it('should find files that have not been processed', () => {
    return Audio.findNotProcessed()
      .then(results => {
        expect(results).toBeDefined();
        expect(results.remote_path).toEqual(audio.remote_path);
      })
  })

  it('should update is_processed property when requested', () => {
    return Audio.findNotProcessed()
      .then(results => {
        const audioId = results.audio_id;
        return Audio.update(audioId, 'is_processed', true)
          .then(results => {
            const file = results[0];
            expect(file.audio_id).toEqual(audioId);
            expect(file.remote_path).toEqual(audio.remote_path);
            expect(file.is_processed).toEqual(true);
          })
      })
  })

})