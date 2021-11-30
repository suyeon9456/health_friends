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
      console.log('id', additionalId);
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
    // console.log('test', additionalFriends);
    // console.log('??', recommendFriends.concat(additionalFriends));
    
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
    // const matching = await User.findAll({
    //   attributes: ['id', 'nickname'],
    //   // where,
    //   include: [{
    //     model: Schedule,
    //     as: 'reqSchedule',
    //     attributes: [[Sequelize.fn('count', '*'), 'count']],
    //     // group: "UserId",
    //   }, {
    //     model: Schedule,
    //     as: 'resSchedule',
    //     attributes: ['id'],
    //   }],
    //   // order: [ [Userdetail, 'rematchingRate', 'DESC'] ],
    // });
  
    // console.log('rematching: ', rematching);
    // console.log('matching: ', matching);
    const matching = await Schedule.findAll({
      where: {
        permission: true,
        isPermitted: true,
      },
      attributes: ['UserId', [Sequelize.fn('count', '*'), 'count']],
      group: 'UserId',
      include: [{
        model: User,
        as: 'Requester',
      }, {
        model: User,
        as: 'Friend',
      }],
      order: [[Sequelize.literal('count'), 'DESC']],
    })
    res.status(200).json({ rematching, matching });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
