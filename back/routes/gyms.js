const express = require('express');
const { Op } = require('sequelize');
const { Gym, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /gyms/
  try {
    const where = {};
    console.log(decodeURIComponent(req.query.searchWord));
    if (req.query.searchWord) {
      where[Op.or] = [{
        name: { [Op.like]: "%" + decodeURIComponent(req.query.searchWord) + "%" },
      }, {
        address: { [Op.like]: "%" + decodeURIComponent(req.query.searchWord) + "%" },
      }];
    }

    if (!!(req.query.swLat && req.query.neLat && req.query.swLon && req.query.neLon)) {
      where.latitude = { [Op.between]: [req.query.swLat, req.query.neLat] };
      where.longitude = { [Op.between]: [req.query.swLon, req.query.neLon] };
    }
    
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const gyms = await Gym.findAll({
      attributes: ['id', 'name', 'address', 'addressRoad', 'phone', 'latitude', 'longitude'],
      where,
      limit: 5,
      include: [{
        model: User,
        attributes: ['id'],
      }],
      order: [ ['latitude', 'DESC'], ['longitude', 'DESC'] ],
    });
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
