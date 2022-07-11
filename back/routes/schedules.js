const express = require('express');
const { Op } = Sequelize = require('sequelize');
const { Schedule, Cancel, User, Gym, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    const userId = req.query.userId || req.user.id;
    const listSize = 3;
    const { fs, fp, ft, isCanceled } = req.query;
    
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
    
    if (fp && !fp.includes(',')) {
      console.log('?');
      if (fp === 'scheduled') {
        where.startDate = {
          [Op.or]: [{ [Op.gte]: new Date() }]
        };
      }
      if (fp === 'last') {
        where.startDate = {
          [Op.or]: [{ [Op.lt]: new Date() }]
        };
      }
    }

    if (ft && !ft.includes(',')) {
      if (ft === 'request') {
        where.UserId = userId;
      }
      if (ft === 'receive') {
        where.FriendId = userId;
      }
    }

    if (fs && !fs.includes(',')) {
      if (fs === 'before') {
        where.isPermitted = false;
        where.permission = false;
      }
      if (fs === 'after') {
        where.isPermitted = true;
        where.permission = { [Op.or]: [false, true] }
      }
    }

    console.log('isCanceled', isCanceled);

    if (isCanceled) {
      detailWhere = {
        isCanceled: true
      };
    }

    const schedulesCount = await Schedule.findAndCountAll({ where });

    const schedules = await Schedule.findAll({
      where: {
        ...where,
        // '$Cancel.isCanceled$': isCanceled ? { [Op.ne]: null } : { [Op.eq]: null },
      },
      limit: listSize,
      offset: parseInt(req.query.limit, 10),
      attributes: [
        'id',
        'description',
        'permission',
        'isPermitted',
        'isFixed',
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
        model: Cancel,
        where: detailWhere,
      }],
      order: [ ['isFixed', 'DESC'], ['startDate', 'DESC'] ],
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
        model: Cancel,
      }],
    });

    res.status(201).json(schedules);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/realtime', async (req, res, next) => { // GET /schedules/realtime
  try {
    const now = new Date();
    const matching = await Schedule.findAll({
      where: {
        [Op.and]: [{
          startDate: {[Op.lte]: now},
        }, {
          endDate: {[Op.gte]: now},
        }, {
          isPermitted: true,
        }, {
          permission: true,
        }, {
          CancelId: null
        }],
      },
      attributes: ['id'],
      include: [{
        model: User,
        as: 'Requester',
        attributes: [
          'id',
          'nickname'
        ],
        include: [{
          model: Image,
          attributes: ['id', 'src']
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
          attributes: ['id', 'src']
        }],
      }, {
        model: Gym,
        attributes: ['address', 'addressRoad', 'name'],
      }],
    });

    res.status(200).json(matching);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
