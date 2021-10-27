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
      where.date = {
        [Op.gte]: new Date(),
      }
    } else if (req.query.type === 'lastRecord') {
      where.date = {
        [Op.lt]: new Date(),
      }
    } else if (req.query.type === 'rejectedRecord') {
      where.permission = false;
    }
    const schedule = await Schedule.findAll({
      where,
      limit: parseInt(req.query.limit, 10),
      attributes: [
        'id',
        'description',
        'permission',
        [Sequelize.fn('date_format', Sequelize.col('date'), '%Y-%m-%d %H:%i'), 'date']
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
