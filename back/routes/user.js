const express = require('express');

const router = express.Router();
router.post('/', (req, res) => { // POST /user
  res.json({ id: 1, email: 'test' });
});

module.exports = router;
