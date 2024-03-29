const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/userSchema').userSchema;
const errorHandler = require('../middleware/errorHandler');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => { errorHandler(error, req, res, next); });
}

function createUser(req, res, next) {
  const { password: userPassword, ...userProps } = req.body;
  return bcrypt.hash(userPassword, 10)
    .then((hash) => User.create({ ...userProps, password: hash }))
    .then((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return res.status(201).send(userWithoutPassword);
    })
    .catch((error) => { errorHandler(error, req, res, next); });
}

function login(req, res, next) {
  const { email, password: userPassword } = req.body;
  User
    .findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('неверный логин или пароль');
    })
    .then((user) => bcrypt.compare(userPassword, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }
        throw new UnauthorizedError('неверный логин или пароль');
      }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      const { password, ...userWithoutPassword } = user.toObject();
      res.send({ user: userWithoutPassword, jwt });
    })
    .catch((error) => { errorHandler(error, req, res, next); });
}

function updateUser(updateData) {
  return (req, res, next) => {
    User.findByIdAndUpdate(
      req.user._id,
      updateData(req),
      { new: true, runValidators: true },
    )
      .then(() => {
        res.status(200).send(req.body);
      })
      .catch((error) => {
        errorHandler(error, req, res, next);
      });
  };
}

const updateProfile = updateUser((req) => ({ name: req.body.name, about: req.body.about }));

const updateAvatar = updateUser((req) => ({ avatar: req.body.avatar }));

function getCurrentUser(req, res, next) {
  User
    .findById(req.user._id)
    .then((user) => res.send(user))
    .catch((error) => { errorHandler(error, req, res, next); });
}

module.exports = {
  getUser, getUsers, createUser, updateProfile, updateAvatar, login, getCurrentUser,
};
