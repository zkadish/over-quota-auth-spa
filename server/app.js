var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var testRouter = require('./routes/test');
var lambdasRouter = require('./routes/lambdas');
var statusRouter = require('./routes/status');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);
app.use('/lambdas', lambdasRouter);
app.use('/status', statusRouter);

module.exports = app;
