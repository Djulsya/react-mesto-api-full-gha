const express = require('express');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env; // urlMongo = 'mongodb://0.0.0.0:27017'

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://back.jules-bo.nomoredomains.xyz',
    'https://back.jules-bo.nomoredomains.xyz',
    'http://jules-bo.nomoredomains.xyz',
    'https://jules-bo.nomoredomains.xyz',
  ],
  credentials: true,
}));

// mongoose.connect(`${urlMongo}/mestodb`, {
//   useNewUrlParser: true,
// });

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
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
