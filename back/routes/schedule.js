const express = require('express');
const { Op } = require('sequelize');
const { Schedule, User, Gym, Userdetail } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /schedule/
  try {
    const schedule = await Schedule.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      permission: false,
      isPermitted: false,
    })
    if (schedule) {
      console.log('req.body', req.body);
      await schedule.setRequester(req.body.userId);
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
        'isPermitted',
        [Sequelize.fn('date_format', Sequelize.col('Schedule.startDate'), '%Y-%m-%d %H:%i'), 'startDate'],
        [Sequelize.fn('date_format', Sequelize.col('Schedule.endDate'), '%Y-%m-%d %H:%i'), 'endDate']
      ],
      include: [{
        model: User,
        as: 'Requester',
        attributes: [
          'id',
          'nickname'
        ],
        //     [Sequelize.fn('count', Sequelize.col('Requester->reqSchedule.id')), 'count'],
      }, {
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
    });

    const userReqRematchingInfo = await Schedule.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        'FriendId',
      ],
      where: { UserId: req.user.id, permission: true, isPermitted: true },
      group: ['FriendId']
    });
    const userResRematchingInfo = await Schedule.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        ['UserId', 'FriendId'],
      ],
      where: { FriendId: req.user.id, permission: true, isPermitted: true },
      group: ['UserId']
    });
    const friendReqRematchingInfo = await Schedule.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        'FriendId',
      ],
      where: { UserId: schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id, permission: true, isPermitted: true },
      group: ['FriendId']
    });
    const friendResRematchingInfo = await Schedule.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        ['UserId', 'FriendId'],
      ],
      where: { FriendId: schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id, permission: true, isPermitted: true },
      group: ['UserId']
    });

    res.status(201).json({ schedule, userReqRematchingInfo, userResRematchingInfo, friendReqRematchingInfo, friendResRematchingInfo });
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

router.put('/permission', async (req, res, next) => { // PUT /schedule/permission
  try {
    console.log(req.body);
    console.log(req.user.id);
    const { scheduleId, permission, myRematchingRate, friendId, friendRematchingRate } = req.body;

    const schedule = await Schedule.update({
      permission: permission,
      isPermitted: true
    }, {
      where: {
        id: scheduleId,
        FriendId: req.user.id,
      }
    });

    const user = await Userdetail.update({
      rematchingRate: myRematchingRate
    }, {
      where: {
        UserId: req.user.id,
      }
    });
    const friend = await Userdetail.update({
      rematchingRate: friendRematchingRate
    }, {
      where: {
        UserId: friendId,
      }
    });

    const fullSchedule = await Schedule.findOne({
      where: {
        id: req.body.scheduleId,
      },
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
    });
    res.status(201).json(fullSchedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
