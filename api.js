let Router = require('express').Router();
let Mocha = require('./mocha.js');

Router.post('/init', async(req, res) => {
  let phone = req.body.phone;

  let mocha = new Mocha(phone);

  req.session.mocha = mocha;

  let data = await mocha.getCaptchaUrl();

  return res.json(data);
});

Router.post('/sendOTP', async(req, res) => {
  let captcha = req.body.captcha;

  let mocha = req.session.mocha;

  return res.json(await mocha.sendOTP(captcha));
});

Router.post('/loginWithOTP', async(req, res) => {
  let otp = req.body.otp;

  let mocha = req.session.mocha;

  return res.json(await mocha.loginWithOTP(otp));
});

Router.post('/minusTurn', async(req, res) => {
  let mocha = req.session.mocha;

  return res.json(await mocha.minusTurn());
});

Router.post('/getReward', async(req, res) => {
  let key = req.body.key;

  let mocha = req.session.mocha;

  return res.json(await mocha.getReward(key));
});

module.exports = Router;