require('dotenv').config();

const { NODE_ENV } = process.env;
const express = require('express');

// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { NotFoundError } = require('./errors/NotFoundError');
const allowCORS = require('./middleware/allowCORS');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(allowCORS);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());

const baseUrl = NODE_ENV === 'production' ? 'mongodb://api.thecure.nomoredomains.monster:27017/mestodb' : 'mongodb://localhost:27017/mestodb';

mongoose.connect(`${baseUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: 'Internal server errorrrr' });
    next();
  }
});

app.listen(PORT, () => {
  console.log(`privet && app listening on port ${PORT}`);
});
