const express = require('express');
const { Op } = require('sequelize');
const { Gym, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /gyms/
  try {
    console.log('swLat: ', req.query.swLat);
    console.log('neLat: ', req.query.neLat);
    console.log('swLon: ', req.query.swLon);
    console.log('neLon: ', req.query.neLon);
    const where = {
      name: { [Op.like]: "%" + req.query.searchWord + "%" },
      address: { [Op.like]: "%" + req.query.searchWord + "%" },
      latitude: { [Op.between]: [req.query.swLat, req.query.neLat] },
      longitude: { [Op.between]: [req.query.swLon, req.query.neLon] },
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
        attributes: ['id'],
      }]
    });
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
