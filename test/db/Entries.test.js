require('dotenv').config();
let db = null;
let Users = null;
let Audio = null;
let Entries = null;
let EntryText = null;

beforeAll(() => {
  if (process.env.IS_ON === 'development') {
    process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  }
  Users = require('../../server/models/users.js');
  Audio = require('../../server/models/audio.js');
  Entries = require('../../server/models/entries.js');
  EntryText = require('../../server/models/entry-text.js');
  const dbConfig = require('../../db/config.js');
  db = dbConfig.db;
})

afterAll(() => {
  //TODO: delete anything that is added 
  return db.one("DELETE FROM audio WHERE audio_path = 'testPath'");
})

describe('Entries table', () => {

  it('should have an entries table', () => {
    db.any('SELECT * FROM entries')
      .then(result => {
        expect(result).toBeDefined();
      })
  })

  it('should return a user\'s entries given a user id', () => {
    const newUser = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Smith',
      password: 'password',
      phone: '123-456-7890',
      phone_verified: false
    }

    const audioPath = 'testPath';
    const entryText = 'Test entry';

    let userId = null;

    return Users.new(newUser)
      .then(user => {
        userId = user.user_id;
        return Audio.new(audioPath)
      })
      .then(file => {
        return Entries.new(userId, file.audio_id)
      })
      .then(entry => {
        return EntryText.new(entry.entry_id, entryText)
      })
      .then(() => {
        return Entries.findByUserId(userId)
      })
      .then(results => {
        expect(results).toBeDefined();
        expect(results[0].text).toEqual('Test entry');
      })
  })


})