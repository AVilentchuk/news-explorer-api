const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const errorHandler = require('./scripts/errorHandler');
const { reqLogger } = require('./scripts/logging');
const timeStamp = require('./middleware/requestStamp');
const { register, login } = require('./controllers/users');
const articles = require('./routes/articles');
const users = require('./routes/users');
require('dotenv').config();
const { PORT } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsdb');

app.use(reqLogger, timeStamp);

app.post('/signup', register);
app.post('/signin', login);
app.use('/articles', auth, articles);
app.use('/users', auth, users);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
