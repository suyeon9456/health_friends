const express = require('express');
const { Gym, User } = require('../models');

const router = express.Router();
// router.get('/', async (req, res, next) => { // GET /gym/
//   try {
//     const list = await Gym.findAll({
//       include: [{
//         model: User,
//         as: 'Member',
//         attributes: ['id'],
//       }]
//     });
//     res.status(200).json(list);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

router.post('/', async (req, res, next) => {
  try {
    const gym = await Gym.create({
      sido: req.body.sido,
      sigungu: req.body.sigungu,
      address: req.body.address,
      name: req.body.name,
    })
    console.log('gym', gym);
    res.status(201).json(gym);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
