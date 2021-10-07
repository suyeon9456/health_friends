const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 모든 정보를 담고 있으면 무겁기 때문에 쿠키랑 이어줄 id만 저장
  });

  passport.deserializeUser(async (id, done) => { // 로그인 이후 요청부터는 라우터 전에 실행된다. (req.user로 라우터에서 정보를 확인할 수 있다.)
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user 안에 넣어줌
    } catch (error) {
      console.log(error);
      done(error);
    }
  });

  local();
};
