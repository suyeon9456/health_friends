const express = require('express');
const { User, Userdetail, Gym } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [{
          model: Userdetail,
          attributes: [
            'description',
            'startTime',
            'endTime',
            'friendsAge',
            'friendsCareer',
            'friendsGender',
            'friendsRole'
          ],
        }, {
          model: Gym,
        }]
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

router.get('/profile/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [{
        model: Userdetail,
        attributes: [
          'description',
          'startTime',
          'endTime',
          'friendsAge',
          'friendsCareer',
          'friendsGender',
          'friendsRole'
        ],
      }, {
        model: Gym,
      }]
    });
    res.status(200).json(user);
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
      friendsGender: friendsInfo.friendsGender,
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

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname
    }, {
      where: { id: req.user.id }
    });
    res.json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/description', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req.body', req.body.description);
    await Userdetail.update({
      description: req.body.description
    }, {
      where: { UserId: req.user.id }
    });
    res.json({ description: req.body.description });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
      gender: req.body.gender,
      age: req.body.age,
      career: req.body.career,
      role: req.body.role,
    }, {
      where: { id: req.user.id }
    });

    await Userdetail.update({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    }, {
      where: { UserId: req.user.id }
    });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password'],
      },
      include: [{
        model: Userdetail,
        attributes: [
          'description',
          'startTime',
          'endTime',
          'friendsAge',
          'friendsCareer',
          'friendsGender',
          'friendsRole'
        ],
      }]
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/detail', isLoggedIn, async (req, res, next) => {
  try {
    await Userdetail.update({
      friendsGender: req.body.gender,
      friendsAge: req.body.age,
      friendsCareer: req.body.career,
      friendsRole: req.body.role,
    }, {
      where: { UserId: req.user.id }
    });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password'],
      },
      include: [{
        model: Userdetail,
        attributes: [
          'description',
          'startTime',
          'endTime',
          'friendsAge',
          'friendsCareer',
          'friendsGender',
          'friendsRole'
        ],
      }]
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
