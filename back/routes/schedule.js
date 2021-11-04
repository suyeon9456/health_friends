const express = require('express');
const { Schedule, User, Gym } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /schedule/
  try {
    const schedule = await Schedule.create({
      date: req.body.date,
      description: req.body.description,
      permission: false,
      isPermitted: false,
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

router.get('/:id', async (req, res, next) => { // GET /schedule/
  try {
    const where = {
      id: req.params.id,
    }
    const schedule = await Schedule.findOne({
      where,
      attributes: [
        'id',
        'description',
        'permission',
        [Sequelize.fn('date_format', Sequelize.col('startDate'), '%Y-%m-%d %H:%i'), 'startDate'],
        [Sequelize.fn('date_format', Sequelize.col('endDate'), '%Y-%m-%d %H:%i'), 'endDate']
      ],
      include: [{
        model: User,
        as: 'Friend',
        attributes: [
          'id',
          'nickname',
        ],
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

router.put('/', async (req, res, next) => { // PUT /schedule/
  try {
    const schedule = await Schedule.update({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description
    }, {
      where: { id: req.body.id }
    });
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
