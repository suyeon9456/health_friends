const express = require('express');
const { Op } = Sequelize = require('sequelize');
const { Schedule, User, Gym } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    const where = {
      UserId: req.user.id,
    }
    if (req.query.type === 'scheduledRecord') {
      where.startDate = {
        [Op.gte]: new Date(),
      };
      where.isPermitted = true;
      where.permission = true;
    } else if (req.query.type === 'lastRecord') {
      where.startDate = {
        [Op.lt]: new Date(),
      };
      where.isPermitted = true;
      where.permission = true;
    } else if (req.query.type === 'rejectedRecord') {
      where.isPermitted = true;
      where.permission = false;
    }
    const schedule = await Schedule.findAll({
      where,
      limit: parseInt(req.query.limit, 10),
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
          'nickname'
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

module.exports = router;
