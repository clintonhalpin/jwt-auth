var express = require('express'),
    jwt = require('express-jwt'),
    config = require('./../config'),
    quoter = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);
app.get('/api/protected/', function(req, res) {
  res.status(200).send('Logged In Yall!');
});