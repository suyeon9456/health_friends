const express = require('express');
const { Op } = Sequelize = require('sequelize');
const { Schedule, ScheduleDetail, User, Gym, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    const userId = req.query.userId || req.user.id;
    const listSize = 3;
    const { before, after, scheduledRecord, lastRecord, requestRecord, receiveRecord, rejectedMatching } = req.query;
    const where = {
      isPermitted: { [Op.or]: [false, true] },
      permission: { [Op.or]: [false, true] },
      [Op.or]: [{
          UserId: userId,
        }, {
          FriendId: userId,
      }],
    };

    let detailWhere = null;
    
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
        where.UserId = userId;
        where.FriendId = { [Op.not]: userId };
      }
      if (receiveRecord && !requestRecord) {
        where.FriendId = userId;
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
      detailWhere = {
        isCanceled: true
      };
    }

    const schedulesCount = await Schedule.findAndCountAll({ where });

    const schedules = await Schedule.findAll({
      where,
      limit: listSize,
      offset: parseInt(req.query.limit, 10),
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
        as: 'Cancel',
        where: detailWhere,
      }],
      order: [ ['startDate', 'DESC'] ],
    });

    res.status(201).json({ schedules,
      nextCursor: (schedulesCount.count - (parseInt(req.query.limit, 10) + 
      3)) > 0 ? parseInt(req.query.limit, 10) + 3 : -1 });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/calendar', async (req, res, next) => { // GET /schedules/calendar
  try {
    const { start, end } = req.query;
    const userId = req.query.userId || req.user.id;

    const where = {
      startDate: { [Op.gte]: new Date(start) },
      endDate: { [Op.lt]: new Date(end) },
      [Op.or]: [{
          UserId: userId,
        }, {
          FriendId: userId,
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
