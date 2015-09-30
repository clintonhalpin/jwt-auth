var express = require('express'),
    jwt = require('express-jwt'),
    config = require('./../config'),
    jwtMiddleware = require('./jwtMiddleware')

var app = module.exports = express.Router();

app.use('/api/protected', jwtMiddleware.decode);
app.get('/api/protected/', function(req, res) {
  res.status(200).send('Logged In Yall');
});
