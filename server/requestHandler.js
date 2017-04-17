//This technically doesn't belong here,
//but I've left it in to make sure the db works in deployed state.
//We can remove once the db is used in one of the server routes.
const router = require('express').Router();
const Auth = require('./auth/utils.js');
const { db } = require('../db/config.js');
const Entries = require('./models/entries.js');

router.use('/entries', Auth.authMiddleware);

router.get('/entries', (req, res) => {
  const userId = req.user.user_id;
  
  Entries.findByUserId(1) 
  .then(results => {
    res.status(200).send({
      entries: results
    })
  })
  .catch(err => {
    console.err(err);
    res.status(400).send({
      error: err
    })
  })
})

module.exports = router;