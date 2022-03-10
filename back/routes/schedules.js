const express = require('express');
const { Op } = Sequelize = require('sequelize');
const { Schedule, ScheduleDetail, User, Gym, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    const { before, after, scheduledRecord, lastRecord, requestRecord, receiveRecord, rejectedMatching } = req.query;

    const where = {
      isPermitted: { [Op.or]: [false, true] },
      permission: { [Op.or]: [false, true] },
      [Op.or]: [{
          UserId: req.user.id,
        }, {
          FriendId: req.user.id,
      }],
    }
    if (scheduledRecord || lastRecord) {
      const list = [];
      const list1 = scheduledRecord ? { [Op.gte]: new Date() } : null;
      const list2 = lastRecord ? { [Op.lt]: new Date() } : null;
      if (list1) {
        list.push(list1);
      }
      if (list2) {
        list.push(list2);
      }
      const startDateWhere = { [Op.or]: list };
      where.startDate = startDateWhere;
    }

    if (requestRecord || receiveRecord) {
      if (requestRecord && !receiveRecord) {
        where.UserId = req.user.id;
        where.FriendId = { [Op.not]: req.user.id };
      }
      if (receiveRecord && !requestRecord) {
        where.FriendId = req.user.id;
      }
    }

    if (before || after) {
      if (before || !after) {
        where.isPermitted = false;
        where.permission = false;
      }
      if (after || !before) {
        where.isPermitted = true;
        where.permission = { [Op.or]: [false, true] }
      }
      if (after && before) {
        where.isPermitted = { [Op.or]: [false, true] }
        where.permission = { [Op.or]: [false, true] }
      }
    }
    if (rejectedMatching === 'true') {
      where.permission = false;
    }

    const schedulesCount = await Schedule.findAndCountAll({ where });

    const schedules = await Schedule.findAll({
      where,
      // limit: req.query.profileMenu === 'calendar' ? null : parseInt(req.query.limit, 10),
      limit: parseInt(req.query.limit, 10),
      attributes: [
        'id',
        'description',
        'permission',
        'isPermitted',
        [Sequelize.fn('date_format', Sequelize.col('startDate'), '%Y-%m-%d %H:%i'), 'startDate'],
        [Sequelize.fn('date_format', Sequelize.col('endDate'), '%Y-%m-%d %H:%i'), 'endDate']
      ],
      include: [{
        model: User,
        as: 'Requester',
        attributes: ['id', 'nickname'],
        include: [{
          model: Image
        }, {
          model: User,
          as: 'Liker',
        }],
      }, {
        model: User,
        as: 'Receiver',
        attributes: ['id', 'nickname'],
        include: [{ model: Image }],
      }, {
        model: Gym,
        attributes: ['address', 'name'],
      }, {
        model: ScheduleDetail,
        as: 'Cancel'
      }],
      order: [ ['startDate', 'DESC'] ],
    });

    res.status(201).json({ schedules, count: schedulesCount.count });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/calendar', async (req, res, next) => { // GET /schedules/calendar
  try {

    const { start, end } = req.query;

    const where = {
      startDate: { [Op.gte]: new Date(start) },
      endDate: { [Op.lt]: new Date(end) },
      [Op.or]: [{
          UserId: req.user.id,
        }, {
          FriendId: req.user.id,
      }],
    }

    const schedules = await Schedule.findAll({
      where,
      attributes: [
        'id',
        'description',
        'permission',
        'isPermitted',
        [Sequelize.fn('date_format', Sequelize.col('startDate'), '%Y-%m-%d %H:%i'), 'startDate'],
        [Sequelize.fn('date_format', Sequelize.col('endDate'), '%Y-%m-%d %H:%i'), 'endDate']
      ],
      include: [{
        model: User,
        as: 'Requester',
        attributes: [
          'id',
          'nickname'
        ],
        include: [{
          model: Image,
        }],
      }, {
        model: User,
        as: 'Receiver',
        attributes: [
          'id',
          'nickname'
        ],
        include: [{
          model: Image,
        }],
      }, {
        model: Gym,
        attributes: ['address'],
      }, {
        model: ScheduleDetail,
        as: 'Cancel'
      }],
    });

    res.status(201).json(schedules);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
