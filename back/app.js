const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const gymRouter = require('./routes/gym');
const gymsRouter = require('./routes/gyms');
const scheduleRouter = require('./routes/schedule');
const schedulesRouter = require('./routes/schedules');

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

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}
app.use(cors({
  origin: ['http://localhost:6010', 'healthfriends.com'],
  credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads')));
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
app.use('/users', usersRouter);
app.use('/gym', gymRouter);
app.use('/gyms', gymsRouter);
app.use('/schedule', scheduleRouter);
app.use('/schedules', schedulesRouter);

app.listen(6015, () => {
  console.log('backend server start', process.env.NODE_ENV);
});
