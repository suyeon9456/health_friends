const express = require('express');
const { User, Userdetail, Gym, Schedule, Image } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일시스템을 조작할 수 있다.
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

router.get('/', async (req, res, next) => {
  console.log('이거뜨나?', req.headers);
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
        }, {
          model: Image,
        }]
      });
      console.log('조회됨?', user);
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
          'friendsRole',
          'rematchingRate'
        ],
      }, {
        model: Gym,
      }, {
        model: Schedule,
        as: 'reqSchedule',
        attributes: ['id', 'permission', 'FriendId']
      }, {
        model: Schedule,
        as: 'resSchedule',
        attributes: ['id', 'isPermitted', 'permission', [Sequelize.col('UserId'), 'FriendId']]
      }, {
        model: Image,
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
      });
      console.log('풀 유저: ', fullUser);
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
    console.log('req.body', req.body);
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
      }, {
        model: Gym,
      }, {
        model: Schedule,
        as: 'reqSchedule',
        attributes: ['id', 'permission', 'FriendId']
      }, {
        model: Schedule,
        as: 'resSchedule',
        attributes: ['id', 'isPermitted', 'permission', [Sequelize.col('UserId'), 'FriendId']]
      }, {
        model: Image,
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

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})

const upload = multer({ // multer에 옵션 설정
  // storage: multer.diskStorage({
  //   destination(req, file, done) {
  //     done(null, 'uploads');
  //   },
  //   filename(req, file, done) { // test.png
  //     const ext = path.extname(file.originalname); // 확장자 추출
  //     const basename = path.basename(file.originalname, ext); // test
  //     done(null, basename + '_' + new Date().getTime() + ext); // test1518545.png
  //   },
  // }),
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'health-friends-s3',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20mb
});

router.post('/image', isLoggedIn, upload.single('image'), async (req, res, next) => { // POST /user/image
  // upload 후에 실행됨
  // 업로드된 파일은 req.files를 확인
  // console.log(req.file);
  // res.json(req.file.filename);
  res.json(req.file.location);
});

router.post('/profileimage', isLoggedIn, async (req, res, next) => { // POST /user/profileimage
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });

    const prevProfileImage = await user.getImage();
    console.log('prevProfileImage: ', prevProfileImage);
    if (prevProfileImage) {
      await Image.destroy({
        where: { 
          id: prevProfileImage.id,
          UserId: req.user.id
        }
      });
    }
  
    const image = await Image.create({ src: req.body.image });
  
    await user.setImage(image);
    console.log(req.file);
    const fullUser = await User.findOne({
      where: { id: user.id },
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
      }, {
        model: Schedule,
        as: 'reqSchedule',
        attributes: ['id', 'permission', 'FriendId']
      }, {
        model: Schedule,
        as: 'resSchedule',
        attributes: ['id', 'isPermitted', 'permission', [Sequelize.col('UserId'), 'FriendId']]
      }, {
        model: Image,
      }]
    });
    res.status(200).json(fullUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
