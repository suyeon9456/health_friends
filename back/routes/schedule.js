const express = require('express');
const { Op } = require('sequelize');
const { Schedule, Cancel, User, Gym, Userdetail, Image } = require('../models');

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
      await schedule.setReceiver(req.body.friendId);
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
      await schedule.setReceiver(friendId);
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
    // const userId = req.query.userId || req.user.id;
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
        include: [{
          model: Image,
          attributes: [ 'id', 'src' ],
        }],
      }, {
        model: User,
        as: 'Receiver',
        attributes: [ 'id', 'nickname'],
        include: [{
          model: Image,
          attributes: [ 'id', 'src' ],
        }],
      }, {
        model: Gym,
        attributes: ['id', 'address', 'addressRoad', 'name'],
      }, {
        model: Cancel,
      }],
    });

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

router.put('/permission', isLoggedIn, async (req, res, next) => { // PUT /schedule/permission
  try {
    console.log(req.body);
    const { scheduleId, permission, friendId } = req.body;
    
    const friend = await User.findOne({ where: { id: friendId } });
    if (!friend) {
      res.status(403).send('해당 친구는 존재하지 않는 사용자입니다.');
    }

    await Schedule.update({
      permission: permission,
      isPermitted: true,
    }, {
      where: {
        id: scheduleId,
        FriendId: req.user.id,
      }
    });

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
        as: 'Receiver',
        attributes: [ 'id', 'nickname', ],
      }, {
        model: Gym,
        attributes: ['id', 'address', 'name'],
      }, {
        model: Cancel,
      }],
    });
    res.status(201).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/cancel', isLoggedIn, async (req, res, next) => { // POST /schedule/cancel
  try {
    console.log(req.user.id);
    const schedule = await Schedule.findOne({ where: { id: req.body.id }, attributes: ['id'] });

    if (!schedule) {
      res.status(403).send('존재하지 않는 매칭입니다.');
    }
    
    const cancel = await Cancel.create({
      RequestId: req.user.id,
      ScheduleId: schedule.id,
    });

    await schedule.setCancel(cancel.id);

    const updatedSchedule = await Schedule.findOne({
      where: { id: schedule.id },
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
        as: 'Receiver',
        attributes: [ 'id', 'nickname', ],
      }, {
        model: Gym,
        attributes: ['id', 'address', 'name'],
      }, {
        model: Cancel,
      }],
    });
    res.status(201).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/cancel', isLoggedIn, async (req, res, next) => { // PUT /schedule/cancel
  try {
    console.log(req.body);
    const schedule = await Schedule.findOne({ where: { id: req.body.id }, attributes: ['id', 'CancelId'] });

    if (!schedule) {
      res.status(403).send('존재하지 않는 매칭입니다.');
    }
    
    await Schedule.update({ permission: false }, {
      where: { id: req.body.id }
    });
    console.log('cancelId', schedule.CancelId);

    await Cancel.update({
      ResponseId: req.user.id,
      isCanceled: true,
    }, {
      where: { id: schedule.CancelId }
    });
    res.status(201).send('답변을 완료하였습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
