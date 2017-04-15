// Entries Actions
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export const SET_DISPLAY_MONTH = 'SET_DISPLAY_MONTH';

// User Actions
export const USER_SUBMIT_EMAIL = 'USER_SUBMIT_EMAIL';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

// SignUp Actions
export const CREATING_USER = 'CREATING_USER';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const USER_CREATED = 'USER_CREATED';
export const ACCOUNT_PAGE_SUBMIT = 'ACCOUNT_PAGE_SUBMIT';
export const PHONE_VERIFY_SUBMIT = 'PHONE_VERIFY_SUBMIT';
export const PHONE_PREFS_SUBMIT = 'PHONE_PREFS_SUBMIT';
export const VERIFYING_CODE = 'VERIFYING_CODE';
export const CODE_VERIFIED = 'CODE_VERIFIED';
export const CODE_ERROR = 'CODE_ERROR';
export const SENDING_PHONE_PREFS = 'SENDING_PHONE_PREFS';
export const PHONE_PREFS_RECIEVED = 'PHONE_PREFS_RECIEVED';

// Login Actions
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_ERROR = 'LOGIN_ERROR';

// CallMeNow Actions
export const CALLING_NOW = 'CALLING_NOW';
export const CALL_ERROR = 'CALL_ERROR';
export const CALL_SENT = 'CALL_SENT';

import { push } from 'react-router-redux';

export function fetchEntries() {
  let config = {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('id_token')
    }
  };

  return dispatch => {
    dispatch(requestEntries());
    return fetch('/api/entries', config)
      .then(response => response.json())
      .then(results => dispatch(receiveEntries(results.entries)))
      .catch(error => console.error(error))
  }
}

function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries: entries,
    receivedAt: Date.now(),
    isFetching: false
  }
}

function requestEntries() {
  return {
    type: REQUEST_ENTRIES,
    isFetching: true
  }
}

export function setDisplayMonth(month) {
  return {
    type: SET_DISPLAY_MONTH,
    month: month
  }
}

export function userSubmitEmail(email) {
  return {
    type: USER_SUBMIT_EMAIL,
    email: email
  }
}

export function accountPageSubmit() {
  return {
    type: ACCOUNT_PAGE_SUBMIT
  }
}

export function phoneVerifySubmit() {
  return {
    type: PHONE_VERIFY_SUBMIT
  }
}

function creatingUser() {
  return {
    type: CREATING_USER
  }
}

function receiveUserInfo(userInfo) {
  return {
    type: RECEIVE_USER_INFO,
    id: userInfo.user_id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    phone: userInfo.phone,
  }
}

function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    errorMessage: error
  }
}

function userCreated() {
  return {
    type: USER_CREATED
  }
}

export function createUser(user) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: user.password
    })
  }

  return (dispatch) => {
    dispatch(creatingUser());
    return fetch('/api/auth/signup', config)
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        localStorage.setItem('id_token', responseJSON.token);
        dispatch(receiveUserInfo(responseJSON.user));
        dispatch(userCreated());
        dispatch(accountPageSubmit());
      })
      .catch(error => dispatch(signUpError(error)))
  }
}

function verifyingCode() {
  return {
    type: VERIFYING_CODE
  }
}

function codeVerified() {
  return {
    type: CODE_VERIFIED
  }
}

function codeError(error) {
  return {
    type: CODE_ERROR,
    error
  }
}

export function verifyPhoneCode(code) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      authorization: 'Bearer ' + localStorage.getItem('id_token')
    },
    body: JSON.stringify({verificationCode: code})
  };

  return dispatch => {
    dispatch(verifyingCode());
    return fetch('/api/auth/verify', config)
      .then(response => {
        if (response.ok) {
          dispatch(codeVerified());
          dispatch(phoneVerifySubmit());
        } else {
          dispatch(codeError('Invalid Code'));
        }
      })
      .catch( error => { dispatch(codeError(error)) })
  }
}

function loginSubmit() {
  return {
    type: LOGIN_SUBMIT
  }
}

function loginSuccess(userInfo) {
  return {
    type: LOGIN_SUCCESSFUL,
    id: userInfo.user_id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    phone: userInfo.phone,
    email: userInfo.email
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function checkCredentials(credentials) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  };

  return dispatch => {
    dispatch(loginSubmit());
    return fetch('/api/auth/login', config)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid User/Password');
      }
    })
    .then(responseJSON => {
      dispatch(loginSuccess(responseJSON.user));
      dispatch(push('/entries'));
    })
    .catch(error => {
      dispatch(loginError(error.message)); })
  }
}

function callingNow() {
  return {
    type: CALLING_NOW
  }
}

function callError(error) {
  return {
    type: CALL_ERROR,
    error
  }
}

function callSent() {
  return {
    type: CALL_SENT
  }
}

export function makeCall() {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      authorization: 'Bearer ' + localStorage.getItem('id_token')
    }
  };

  return dispatch => {
    dispatch(callingNow());
    return fetch('api/calling/call', config)
      .then(response => {
        if (response.ok) {
          dispatch(callSent());
        } else {
          throw new Error('Calling Error');
        }
      })
      .catch(error => {
        dispatch(callError(error));
      })
    }
}
