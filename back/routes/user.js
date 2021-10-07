const express = require('express');
const { User, Userdetail } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();
router.post('/', async (req, res, next) => { // POST /user/
  try {
    console.log('??????????', req.body);
    const { info, moreInfo, gymInfo, selectedGym, friendsInfo } = req.body;
    const exUser = await User.findOne({
      where: {
        email: info.email,
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 email입니다.');
    }
    const hashedPassword = await bcrypt.hash(info.password, 12);
    const user = await User.create({
      email: info.email,
      password: hashedPassword,
      nickname: info.nickname,
      gender: moreInfo.gender,
      age: moreInfo.age,
      career: moreInfo.career,
      role: moreInfo.role,
    });
    const userDetail = await Userdetail.create({
      startTime: gymInfo.startTime,
      endTime: gymInfo.endTime,
      description: gymInfo.description,
      friendsGender: moreInfo.friendsGender,
      friendsAge: friendsInfo.friendsAge,
      friendsCareer: friendsInfo.friendsCareer,
      friendsRole: friendsInfo.friendsRole,
      UserId: user.id,
    });
    await user.addGym(selectedGym.id);
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
