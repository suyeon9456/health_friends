const express = require('express');
const { Schedule, User, Gym } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    const schedule = await Schedule.findAll({
      where: { UserId: req.user.id },
      include: [{
        model: User,
        as: 'Friend',
        attributes: ['id', 'nickname'],
      }, {
        model: Gym,
        attributes: ['address'],
      }],
    })
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
