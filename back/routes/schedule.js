const express = require('express');
const { Schedule } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /schedule/
  try {
    const schedule = await Schedule.create({
      date: req.body.date,
      description: req.body.description,
      permission: false,
    })
    if (schedule) {
      console.log('req.body', req.body);
      await schedule.setUser(req.body.userId);
      await schedule.setFriend(req.body.friendId);
      await schedule.setGym(req.body.gymId);
    }
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
