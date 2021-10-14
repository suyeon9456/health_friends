const express = require('express');
const { Op } = require('sequelize');
const { Gym, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /gyms/
  try {
    const where = {
      name: { [Op.like]: "%" + req.query.searchWord + "%" },
      address: { [Op.like]: "%" + req.query.searchWord + "%" },
    }
    
    if(parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const gyms = await Gym.findAll({
      attributes: ['id', 'name', 'address', 'latitude', 'longitude'],
      where,
      limit: 5,
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
