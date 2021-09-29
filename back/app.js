const express = require('express');
const userRouter = require('./routes/user');

const db = require('./models');
const { urlencoded } = require('express');
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db connection success');
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);

app.listen(6015, () => {
  console.log('backend server start');
});
