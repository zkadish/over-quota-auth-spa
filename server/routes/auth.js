var express = require('express');
var axios = require('axios');
var router = express.Router();

/* POST register users */
router.post('/register-user', function(req, res, next) {
  axios.post('http://localhost:7777/api/auth/register-user', req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* POST create password */
router.post('/create-password', function(req, res, next) {
  axios.post('http://localhost:7777/api/auth/create-password', req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* POST login */
router.post('/login', function(req, res, next) {
  console.log('Cookie', req.cookies);
  axios.post('http://localhost:7777/api/auth/login', req.body, {
    headers: {
      Cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  }).then((response) => {
    const headers = response.headers;
    console.info('Session Cookie:', headers['set-cookie']);
    res.cookie(headers['set-cookie'][0]);
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* POST sign out */
router.post('/sign-out', function(req, res, next) {
  axios.post('http://localhost:7777/api/auth/sign-out', req.body, {
    headers: {
      Cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  }).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* POST forgot password */
router.post('/forgot-password', function(req, res, next) {
  // res.send('test routes');
  axios.post('http://localhost:7777/api/auth/forgot-password', req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* GET validate reset */
router.get('/validate-reset/:token', function(req, res, next) {
  // res.send('test routes');
  axios.get('http://localhost:7777/api/auth/validate-reset/:token').then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* POST reset password */
router.post('/reset-password/:token', function(req, res, next) {
  res.send('test routes');
  axios.post('http://localhost:7777/api/auth/reset-password/:token', req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.error(err);
  })
});

/* GET authn */
router.get('/authn', function(req, res, next) {
  console.info('Client Cookie:', req.cookies)
  axios.get('http://localhost:7777/api/auth/authn', {
    headers: {
      Cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  }).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.log(err);
    res.status(err.response.status).send(err);
  })
});

module.exports = router;
