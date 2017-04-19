require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const dev = require('./dev.js');

const requestHandler = require('./requestHandler.js');
const callingHandler = require('./calling/callingHandler.js');
const authHandler = require('./auth/authHandler.js');
const sentimentHandler = require('./sentiment/sentimentHandler.js');
const Auth = require('./auth/utils.js');

const speechConvertWorker = require('./processing/speechConvertWorker.js');
const downloadWorker = require('./processing/downloadWorker.js');

const app = express();

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  dev.webpack(app);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use('/calls', express.static(path.join(__dirname, '/calling/files')));

app.use('/api/calling', callingHandler);
app.use('/api/sentiment', sentimentHandler);
app.use('/api/auth', authHandler);

app.get('/entries', Auth.authMiddleware, requestHandler.getEntries);

app.get('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
}

speechConvertWorker.start();
downloadWorker.getFileDetails.start();
downloadWorker.downloadFiles.start();

module.exports = { app };
