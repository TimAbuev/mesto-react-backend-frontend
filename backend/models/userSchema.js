const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');

const regVAvatar = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return regVAvatar.test(v);
      },
      message: 'ошибка валидации ссылки на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = {
  userSchema: mongoose.model('user', userSchema),
  signUserSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regVAvatar),
  }),
  profileUserSchema: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
  avatarUserSchema: Joi.object({
    avatar: Joi.string().regex(regVAvatar).required(),
  }),
};
