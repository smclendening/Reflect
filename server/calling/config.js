const twilio = require('twilio');
const fetch = require('isomorphic-fetch');
const Entry = require('../models/entries.js');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio.RestClient(accountSid, authToken);

const _leftPadTwoDigits = (value) => {
  if (value.toString().length === 1) {
    return `0${value}`;
  }
  return value;
};

const _buildParams = (params) => {
  let paramString = '';
  Object.keys(params).forEach((param, index) => {
    paramString += param;
    paramString += '=';
    paramString += params[param];
    if (index !== Object.keys(params).length - 1) {
      paramString += '&';
    }
  });
  return paramString;
};

module.exports = {
  call: (user) => {
    // TODO: Extra security: Verify user phone with user id from DB
    let twilioUrl;
    switch (process.env.IS_ON) {
      case 'production':
        twilioUrl = `${process.env.TWILIO_XML_URL}/calls/voice.xml`;
        break;
      case 'staging':
        twilioUrl = `${process.env.TWILIO_XML_URL}/calls/staging-voice.xml`;
        break;
      default:
        twilioUrl = `${process.env.TWILIO_XML_URL}/calls/dev-voice.xml`;
    }
    console.log(twilioUrl);

    return new Promise((resolve, reject) => {
      client.calls.create({
        url: twilioUrl,
        from: process.env.TWILIO_FROM,
        to: user.phone,
        method: 'GET'
      }, (err, call) => {
        if (err) {
          reject(err);
        } else {
          console.log('Call SID: ', call.sid);
          Entry.new({
            user_id: user.user_id,
            call_id: call.sid
          });
          resolve(call.sid);
        }
      });
    });
  },

  sendVerification: (phone, countryCode = 1) => {
    const config = {
      method: 'POST'
    };

    // TODO: Save user phone number without country code
    // TODO: Get user's phone details from user_id
    const params = _buildParams({
      api_key: process.env.AUTHY_KEY,
      via: 'sms',
      phone_number: phone,
      country_code: countryCode
    });

    return fetch(`https://api.authy.com/protected/json/phones/verification/start?${params}`, config)
      .then(() => (
        console.log('Verification sms sent successfully to: ', phone)
      ))
      .catch(error => (
        console.log(error)
      ));
  },

  verify: (phoneNumber, countryCode, verificationCode) => {
    const config = {
      method: 'GET'
    };

    const params = _buildParams({
      api_key: process.env.AUTHY_KEY,
      phone_number: phoneNumber,
      country_code: countryCode,
      verification_code: verificationCode
    });

    return fetch(`https://api.authy.com/protected/json/phones/verification/check?${params}`, config)
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        throw new Error('Invalid verification code');
      });
  },

  getRecordings: () => {
    // TODO: Update date created when ready
    // TODO: Download checking by call_sid even though 1 call_sid might have many audios
    const fromDate = new Date();
    const dateCreated = `${fromDate.getFullYear().toString()}-${_leftPadTwoDigits(fromDate.getMonth() + 1)}-${_leftPadTwoDigits(fromDate.getDate() + 2)}`;
    return new Promise((resolve, reject) => {
      client.recordings.list({
        'dateCreated>': '2017-04-14',
        'dateCreated<': dateCreated
      }, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      });
    });
  }
};
