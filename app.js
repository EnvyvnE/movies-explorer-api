require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index.js');
const NotFoundError = require('./errors/not-found-error');
const { handleErrors } = require('./middlewares/handleErrors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: ['*'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type',
    'origin', 'Authorization', 'authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});
app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

router.use((req) => {
  throw new NotFoundError(`Ресурс по адресу ${req.path} не найден`);
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
