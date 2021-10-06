const express = require('express');
const { Gym, User } = require('../models');

const router = express.Router();
router.get('/', async (req, res, next) => { // GET /gym/
  try {
    const gyms = await Gym.findAll({
      attributes: ['id', 'name', 'address'],
    });
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => { // POST /gym/
  try {
    const gym = await Gym.create({
      sido: req.body.sido,
      sigungu: req.body.sigungu,
      address: req.body.address,
      name: req.body.name,
    })
    res.status(201).json(gym);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
