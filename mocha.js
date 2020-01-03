let request = require('request-promise');
let _ = require('lodash');

class Mocha {
  constructor(phone) {
    this.phone = phone;
    this.r = request.defaults({
      url: 'https://viettel.vn/vtgame/api.php',
      jar: true,
      json: true
    });
  }

  async getCaptchaUrl() {
    let data = await this.r.post({
      form: {
        action: 'get_captcha',
        service: 'MYVIETTEL'
      }
    });

    this.sid = _.get(data, 'data.sid');

    return data.data.url;
  }

  async sendOTP(captcha) {
    let data = await this.r.post({
      form: {
        telephone: this.phone,
        captcha,
        sid: this.sid,
        action: 'get_otp_captcha',
        service: 'MYVIETTEL'
      }
    });

    return data;
  }

  async loginWithOTP(otp) {
    let data = await this.r.post({
      form: {
        telephone: this.phone,
        otp,
        action: 'send_otp',
        service: 'MYVIETTEL'
      }
    });

    this.token = _.get(data, 'data.token');

    return data;
  }

  async minusTurn() {
    let data = await this.r.post({
      form: {
        token: this.token,
        action: 'minus_turns',
        service: 'MYVIETTEL'
      }
    });

    return data;
  }

  async getReward(key) {
    let data = await this.r.post({
      form: {
        token: this.token,
        key,
        action: 'get_reward',
        service: 'MYVIETTEL',
        ott: 'MYVIETTEL'
      }
    });

    return data;
  }
}

module.exports = Mocha;