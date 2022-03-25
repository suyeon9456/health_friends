const express = require('express');
const { Op } = require('sequelize');
const { Gym, User, Userdetail, Image, Schedule } = require('../models');

const router = express.Router();
router.get('/', async (req, res, next) => { // GET /gym/
  try {
    const gyms = await Gym.findAll({
      attributes: ['id', 'name', 'address'],
    });
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => { // POST /gym/
  try {
    console.log(req.body);
    const gym = await Gym.create({
      address: req.body.address,
      addressRoad: req.body.addressRoad,
      phone: req.body.phone,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    })
    res.status(201).json(gym);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:gymId', async (req, res, next) => { // GET /gym/1
  try {
    console.log('req.params.gymId', req.params.gymId);
    const where = {
      id: req.params.gymId
    }
    const gym = await Gym.findOne({
      where,
      attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'addressRoad', 'phone'],
    });

    if (!gym) {
      return res.status(404).send('존재하지 않는 헬스장입니다.');
    }
    const userWhere = {};
    if (req.user) {
      userWhere.id = {
        [Op.ne]: req.user.id,
      }
    }

    const gymWithFriends = await Gym.findOne({
      where: { id: gym.id },
      attributes: ['id', 'name', 'latitude', 'longitude', 'address'],
      include: [{
        model: User,
        where: userWhere,
        attributes: ['id', 'nickname', 'gender'],
        include: [{
          model: Userdetail,
          attributes: ['startTime', 'endTime', 'description', 'rematchingRate'],
        }, {
          model: Image,
        }, {
          model: Schedule,
          as: 'reqSchedule',
          attributes: ['id', 'RematchId', 'permission'],
        }, {
          model: Schedule,
          as: 'resSchedule',
          attributes: ['id', 'RematchId', 'permission'],
        }]
      }],
    });
    res.status(200).json(gymWithFriends || gym);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
