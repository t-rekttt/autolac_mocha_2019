const API_URL = '/api';

new Vue({
  el: '#main',
  mounted() {
    console.log('It works');
  },
  data() {
    return {
      captchaUrl: null,
      phone: null,
      captcha: null
    }
  },
  methods: {
    init(phone) {
      return fetch(API_URL + '/init', {
        method: 'POST',
        body: JSON.stringify({ phone }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    },
    sendOTP(captcha) {
      return fetch(API_URL + '/sendOTP', {
        method: 'POST',
        body: JSON.stringify({ captcha }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    },
    loginWithOTP(otp) {
      return fetch(API_URL + '/loginWithOTP', {
        method: 'POST',
        body: JSON.stringify({ otp }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    },
    minusTurn() {
      return fetch(API_URL + '/minusTurn', {
        method: 'POST',
        body: JSON.stringify({  }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    },
    getReward(key) {
      return fetch(API_URL + '/getReward', {
        method: 'POST',
        body: JSON.stringify({ key }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    },
    async doInit() {
      let captchaUrl = await this.init(this.phone);

      console.log(captchaUrl);

      this.captchaUrl = captchaUrl;
    },
    async doSendOTP() {
      let sendOTPData = await this.sendOTP(this.captcha);

      console.log(sendOTPData);
    }
  }
});