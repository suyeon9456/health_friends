const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const gymRouter = require('./routes/gym');
const gymsRouter = require('./routes/gyms');
const scheduleRouter = require('./routes/schedule');

const db = require('./models');
const passportConfig = require('./passport');
const { urlencoded } = require('express');

dotenv.config();

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db connection success');
  })
  .catch(console.error);
passportConfig();

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/gym', gymRouter);
app.use('/gyms', gymsRouter);
app.use('/schedule', scheduleRouter);

app.listen(6015, () => {
  console.log('backend server start');
});
