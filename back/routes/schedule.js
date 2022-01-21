const express = require('express');
const { Op } = require('sequelize');
const { Schedule, User, Gym, Userdetail } = require('../models');

const { isLoggedIn } = require('./middlewares');

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

router.post('/re', async (req, res, next) => { // POST /schedule/re
  try {
    console.log('req.body', req.body);
    const { friendId, userId, gymId } = req.body;

    const friend = await User.findOne({
      where: { id: friendId },
      attributes: ['id'],
    });

    if (!friend || friendId === -1) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }

    const schedulesCount = await Schedule.findAndCountAll({ where: {
      [Op.or]: [{
        UserId: req.user.id,
        FriendId: friendId,
      }, {
        FriendId: req.user.id,
        UserId: friendId,
      }],
    } });

    if (schedulesCount < 1) {
      res.status(403).send('해당 사용자와는 매칭이력이 없습니다.');
    }

    const schedule = await Schedule.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      permission: false,
      isPermitted: false,
      RematchId: friendId,
    })
    if (schedule) {
      await schedule.setRequester(userId);
      await schedule.setFriend(friendId);
      await schedule.setGym(gymId);
    }
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => { // GET /schedule/
  try {
    console.log(req.params);
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
        attributes: [ 'id', 'nickname' ],
        //     [Sequelize.fn('count', Sequelize.col('Requester->reqSchedule.id')), 'count'],
      }, {
        model: User,
        as: 'Friend',
        attributes: [ 'id', 'nickname', ],
      }, {
        model: Gym,
        attributes: ['id', 'address', 'name'],
      }],
    });

    console.log(schedule);

    const userMatching = await Schedule.findAll({
      attributes: [
        'FriendId',
        [Sequelize.literal(`(SELECT count(id) AS 'count' FROM schedules WHERE permission = 1 AND isPermitted = 1 AND (UserId = ${req.user.id} OR FriendId = ${req.user.id}))`), 'matchingCount'],
        [Sequelize.literal(`(SELECT count(id) AS 'count' FROM schedules WHERE permission = 1 AND isPermitted = 1 AND RematchId IS NOT NULL AND (UserId = ${req.user.id} OR FriendId = ${req.user.id}))`), 'rematchingCount']
      ],
      where: {
        UserId: req.user.id,
        permission: true,
        isPermitted: true,
        // RematchId: { [Op.not]: null },
      },
      group: ['FriendId']
    });
    const friendMatching = await Schedule.findAll({
      attributes: [
        // [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        'FriendId',
        [Sequelize.literal(
          `(SELECT count(id) AS 'count' FROM schedules WHERE permission = 1 AND isPermitted = 1 AND (UserId = ${schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id} OR FriendId = ${schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id}))`
          ), 'matchingCount'],
        [Sequelize.literal(
          `(SELECT count(id) AS 'count' FROM schedules WHERE permission = 1 AND isPermitted = 1 AND RematchId IS NOT NULL AND (UserId = ${schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id} OR FriendId = ${schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id}))`
          ), 'rematchingCount']
      ],
      where: {
        UserId: schedule.Requester.id === req.user.id ? schedule.Friend.id : schedule.Requester.id,
        permission: true,
        isPermitted: true,
        RematchId: { [Op.not]: null },
      },
      group: ['FriendId']
    });

    res.status(201).json({ schedule, userMatching, friendMatching });
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

router.put('/permission', isLoggedIn, async (req, res, next) => { // PUT /schedule/permission
  try {
    console.log(req.body);
    console.log(req.user.id);
    const { scheduleId, permission, userRematchRate, friendId, friendRematchRate } = req.body;
    
    const friend = await User.findOne({ where: { id: friendId } });
    if (!friend) {
      res.status(403).send('해당 친구는 존재하지 않는 사용자입니다.');
    }

    const schedule = await Schedule.update({
      permission: permission,
      isPermitted: true,
      RematchId: (userRematchRate && userRematchRate) && req.user.id,
    }, {
      where: {
        id: scheduleId,
        FriendId: req.user.id,
      }
    });

    if (!friendRematchRate) {
      await Userdetail.update({
        rematchingRate: myRematchingRate
      }, {
        where: { UserId: req.user.id }
      });
    }
    if (!userRematchRate) {
      await Userdetail.update({
        rematchingRate: friendRematchingRate
      }, {
        where: { UserId: friendId }
      });
    }

    const updatedSchedule = await Schedule.findOne({
      where: { id: scheduleId },
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
        attributes: [ 'id', 'nickname' ],
      }, {
        model: User,
        as: 'Friend',
        attributes: [ 'id', 'nickname', ],
      }, {
        model: Gym,
        attributes: ['id', 'address', 'name'],
      }],
    });
    res.status(201).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
