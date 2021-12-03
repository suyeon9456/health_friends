const express = require('express');
const { Op } = require('sequelize');
const { User, Userdetail, Gym, Schedule, Image } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일시스템을 조작할 수 있다.

const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const schedule = require('../models/schedule');

const router = express.Router();

router.get('/recommendFriends', async (req, res, next) => { // GET /users/recommendFriends
  try {
    const where = {
      [Op.and]: [{
        address: { [Op.like]: "%" + req.query.si + "%" },
      }, {
        // address: { [Op.like]: "%" + '관악구' + "%" },
        address: { [Op.like]: "%" + req.query.gu + "%" },
      }, {
        // address: { [Op.like]: "%" + '봉천동' + "%" },
        address: { [Op.like]: "%" + req.query.dong + "%" },
      }],
    };

    const recommendFriends = await User.findAll({
      attributes: ['id', 'nickname'],
      // where,
      include: [{
        model: Image,
        attributes: ['id', 'src'],
      }, {
        model: Userdetail,
        attributes: ['id', 'rematchingRate'],
      }, {
        model: Gym,
        attributes: ['id', 'name', 'address'],
        where,
      }],
    });
    let additionalFriends = [];
    if (recommendFriends.length < 4) {
      const additionalLength = 4 - recommendFriends.length;
      const additionalId = recommendFriends.map((friend) => friend.id);
      additionalFriends = await User.findAll({
        attributes: ['id', 'nickname'],
        limit: additionalLength,
        where: {
          // [Op.notIn]: { id: additionalId },
          id: { [Op.notIn]: additionalId }
        },
        include: [{
          model: Image,
          attributes: ['id', 'src'],
        }, {
          model: Gym,
          attributes: ['id', 'name', 'address'],
          // where,
        }],
      });
    }
    
    res.status(200).json({ recommendFriends, additionalFriends });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/rankedFriends', async (req, res, next) => { // GET /users/rankedFriends
  try {
    const rematching = await User.findAll({
      attributes: ['id', 'nickname'],
      limit: 5,
      include: [{
        model: Userdetail,
        attributes: ['id', 'rematchingRate'],
      }],
      order: [ [Userdetail, 'rematchingRate', 'DESC'] ],
    });
    const reqMatching = await User.findAll({
      attributes: ['id', 'nickname'],
      limit: 5,
      include: [{
        model: Schedule,
        as: 'reqSchedule',
        where: {
          permission: true,
          isPermitted: true,
        },
        attributes: ['id'],
      }],
    });
    const resMatching = await User.findAll({
      attributes: ['id', 'nickname'],
      limit: 5,
      include: [{
        model: Schedule,
        as: 'resSchedule',
        where: {
          permission: true,
          isPermitted: true,
        },
        attributes: ['id'],
      }],
    });
    // const reqMatching = await Schedule.findAll({
    //   where: {
    //     permission: true,
    //     isPermitted: true,
    //   },
    //   limit: 5,
    //   attributes: ['UserId', [Sequelize.fn('count', '*'), 'count']],
    //   include: [{
    //     model: User,
    //     as: 'Requester',
    //     attributes: ['nickname'],
    //   }],
    //   group: 'UserId',
    //   order: [[Sequelize.literal('count'), 'DESC']],
    // });
    // const resMatching = await Schedule.findAll({
    //   where: {
    //     permission: true,
    //     isPermitted: true,
    //   },
    //   limit: 5,
    //   attributes: [['FriendId', 'UserId'], [Sequelize.fn('count', '*'), 'count']],
    //   include: [{
    //     model: User,
    //     as: 'Friend',
    //     attributes: ['nickname'],
    //   }],
    //   group: 'FriendId',
    //   order: [[Sequelize.literal('count'), 'DESC']],
    // });
    res.status(200).json({ rematching, matching: reqMatching.concat(resMatching) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/realtimeMathcing', async (req, res, next) => { // GET /users/realtimeMathcing
  try {
    const now = new Date();
    const realtimeMatching = await User.findAll({
      attributes: ['id', 'nickname'],
      include: [{
        model: Image,
        attributes: ['id', 'src'],
      }, {
        model: Schedule,
        as: 'reqSchedule',
        where: {
          [Op.and]: [{
            startDate: {[Op.lte]: now},
          }, {
            endDate: {[Op.gte]: now},
          }, {
            isPermitted: true,
          }, {
            permission: true,
          }],
        },
        attributes: ['id', 'UserId'],
        include: [{
          model: Gym,
          attributes: ['id', 'name'],
        }, {
          model: User,
          as: 'Friend',
          attributes: ['id', 'nickname'],
          include: [{
            model: Image,
            attributes: ['id', 'src'],
          },]
        }],
      }],
    });

    res.status(200).json(realtimeMatching);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
