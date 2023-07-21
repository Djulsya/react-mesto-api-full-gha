const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 3000, urlMongo = 'mongodb://127.0.0.1:27017' } = process.env;

mongoose.connect(`${urlMongo}/mestodb`, {
  useNewUrlParser: true
}).then(() => console.log('связь есть'));

const app = express();

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

const start = async () => {
  try {
    await mongoose.connect(urlMongo, {});
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
