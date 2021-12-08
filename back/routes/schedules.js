const express = require('express');
const { Op } = Sequelize = require('sequelize');
const { Schedule, User, Gym, Image } = require('../models');

const router = express.Router();

// router.get('/', async (req, res, next) => { // GET /schedules/
//   try {
//     let where = {
//       [Op.or]: [{
//           UserId: req.user.id,
//         }, {
//           FriendId: req.user.id,
//       }],
//     }
//     if (req.query.type === 'scheduledRecord') {
//       where = {
//         startDate: { [Op.gte]: new Date() },
//         isPermitted: true,
//         permission: true,
//         [Op.or]: [{
//           UserId: req.user.id,
//         }, {
//           FriendId: req.user.id,
//         }],
//       } 
//     } else if (req.query.type === 'lastRecord') {
//       where = {
//         startDate: { [Op.lt]: new Date() },
//         isPermitted: true,
//         permission: true,
//         [Op.or]: [{
//           UserId: req.user.id,
//         }, {
//           FriendId: req.user.id,
//         }],
//       }
//     } else if (req.query.type === 'rejectedRecord') {
//       where = {
//         isPermitted: true,
//         permission: false,
//         [Op.or]: [{
//           UserId: req.user.id,
//         }, {
//           FriendId: req.user.id,
//         }],
//       }
//     } else if (req.query.type === 'receiveRecord') {
//       where = {
//         isPermitted: false,
//         permission: false,
//         FriendId: req.user.id,
//       }
//     } else if (req.query.type === 'requestRecord') {
//       where = {
//         isPermitted: false,
//         permission: false,
//         UserId: req.user.id,
//       }
//     }
//     console.log('where:::::::::::::::::::::::::::::::::', where);

//     const schedule = await Schedule.findAll({
//       where,
//       limit: req.query.type === 'calendar' ? null : parseInt(req.query.limit, 10),
//       attributes: [
//         'id',
//         'description',
//         'permission',
//         [Sequelize.fn('date_format', Sequelize.col('startDate'), '%Y-%m-%d %H:%i'), 'startDate'],
//         [Sequelize.fn('date_format', Sequelize.col('endDate'), '%Y-%m-%d %H:%i'), 'endDate']
//       ],
//       include: [{
//         model: User,
//         as: 'Requester',
//         attributes: [
//           'id',
//           'nickname'
//         ],
//         include: [{
//           model: Image,
//         }],
//       }, {
//         model: User,
//         as: 'Friend',
//         attributes: [
//           'id',
//           'nickname'
//         ],
//         include: [{
//           model: Image,
//         }],
//       }, {
//         model: Gym,
//         attributes: ['address'],
//       }],
//     })
//     res.status(201).json(schedule);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


router.get('/', async (req, res, next) => { // GET /schedules/
  try {
    console.log('testtest', req.query);

    const { scheduledRecord, lastRecord, requestRecord, receiveRecord, rejectedMatching } = req.query;

    const where = {
      isPermitted: true,
      permission: true,
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
      // where = {
        //         isPermitted: false,
        //         permission: false,
        //         FriendId: req.user.id,
        //       }
        //     } else if (req.query.type === 'requestRecord') {
        //       where = {
        //         isPermitted: false,
        //         permission: false,
        //         UserId: req.user.id,
        //       }
      if (requestRecord && !receiveRecord) {
        where.UserId = req.user.id;
        where.FriendId = { [Op.not]: req.user.id };
      }
      if (receiveRecord && !requestRecord) {
        where.FriendId = req.user.id;
      }
    }

    // isPermitted: true,
//         permission: false,
//         [Op.or]: [{
//           UserId: req.user.id,
//         }, {
//           FriendId: req.user.id,
//         }],
    if (rejectedMatching === 'true') {
      where.permission = false;
    }

    const schedule = await Schedule.findAll({
      where,
      limit: req.query.type === 'calendar' ? null : parseInt(req.query.limit, 10),
      attributes: [
        'id',
        'description',
        'permission',
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
        as: 'Friend',
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
      }],
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
