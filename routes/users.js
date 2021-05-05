const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getUserInfo,
} = require('../contollers/users');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
