const express = require('express');
const { Gym, User, Userdetail } = require('../models');

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
    const gym = await Gym.create({
      sido: req.body.sido,
      sigungu: req.body.sigungu,
      address: req.body.address,
      name: req.body.name,
    })
    res.status(201).json(gym);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:gymId', async (req, res, next) => { // GET /gym/1
  try {
    const where = {
      id: req.params.gymId
    }
    const gym = await Gym.findOne({
      where,
      attributes: ['id', 'name'],
    });

    if (!gym) {
      return res.status(404).send('존재하지 않는 헬스장입니다.');
    }

    // if(parseInt(req.query.lastId, 10)) {
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    // }

    const gymWithFriends = await Gym.findOne({
      where: { id: gym.id },
      attributes: ['id', 'name'],
      include: [{
        model: User,
        attributes: ['id', 'nickname', 'gender'],
        include: [{
          model: Userdetail,
          attributes: ['startTime', 'endTime', 'description'],
        }]
      }],
    });
    res.status(200).json(gymWithFriends);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
