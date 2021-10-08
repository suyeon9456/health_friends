const express = require('express');
const { Op } = require('sequelize');
const { Gym, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /gyms/
  try {
    const gyms = await Gym.findAll({
      attributes: ['id', 'name', 'address'],
      where: {
        name: { [Op.like]: "%" + req.query.searchWord + "%" },
        address: { [Op.like]: "%" + req.query.searchWord + "%" },
      },
      include: [{
        model: User,
        attribute: ['id'],
      }]
    });
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
