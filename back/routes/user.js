const express = require('express');
const { User, Userdetail } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id }
      });
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => { // 서버에러, 성공객체, 정보(클라이언트 에러)
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    // req.login은 passport 에서 제공
    return req.login(user, async (loginErr) => { // 우리 서비스의 로그인이 끝난 후 passport에서 한번 더 로그인
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        }
      })
      return res.json(fullUser);
    })
  })(req, res, next); // 미들웨어 확장
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/', async (req, res, next) => { // POST /user/
  try {
    const { info, moreInfo, gymInfo, selectedGym, friendsInfo } = req.body;
    const exUser = await User.findOne({
      where: {
        email: info.email,
      }
    });
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
