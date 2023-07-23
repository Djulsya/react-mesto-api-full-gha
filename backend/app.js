const express = require('express');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://back.jules-bo.nomoredomains.xyz',
    'https://back.jules-bo.nomoredomains.xyz',
    'http://jules-bo.nomoredomains.xyz',
    'https://jules-bo.nomoredomains.xyz',
  ],
  credentials: true,
}));

const { PORT = 3000, urlMongo = 'mongodb://0.0.0.0:27017' } = process.env;

mongoose.connect(`${urlMongo}/mestodb`, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());

const handleError = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
