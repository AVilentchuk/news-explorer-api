const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./scripts/errorHandler');
const { reqLogger } = require('./scripts/logging');
const timeStamp = require('./middleware/requestStamp');
const routes = require('./routes/index');
const { limiter } = require('./scripts/rateLimiter');
require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${MONGO_URL}`);

app.use(reqLogger, timeStamp);

app.use(limiter, routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
