const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();
router.post('/', async (req, res, next) => { // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 email입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
      gender: req.body.gender,
      age: req.body.age,
      time: req.body.time,
      description: req.body.description,
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
