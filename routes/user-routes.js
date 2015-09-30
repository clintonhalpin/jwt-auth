var express = require('express'),
    _ = require('lodash'),
    config = require('./../config'),
    jwt = require('jsonwebtoken');

var app = module.exports = express.Router();

var users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

var createToken = require('./jwtMiddleware').sign;

app.post('/authorization/sign-up', function(req, res) {

    var postRequest = function() {
        var status, send;

        if(!req.body.username || !req.body.password) {
          status = 400;
          send = 'Bad request';
        } else if( _.find(users, {username: req.body.username})) {
          status = 400;
          send = "User already exists";
        } else {
            var profile = _.pick(req.body, 'username', 'password', 'extra');
            profile.id = _.max(users, 'id').id + 1;
            users.push(profile);

            console.log(createToken(profile));

            status = 201;
            send = {
                id_token: createToken(profile)
            }
        }
        return {
          status: status,
          send: send
        }
    }
    res.status(postRequest().status).send(postRequest().send);
});

app.post('/authorization/sign-in', function(req, res) {
  var user = _.find(users, {username: req.body.username});

  var postRequest = function(){
    var status, send;

    if(!req.body.username || !req.body.password) {
      status = 400;
      send = 'Bad request';
    } else if( !user || user.password !== req.body.password ) {
      status = 401;
      send = "Username or password don't match, or don't exist";
    } else {
      status = 201;
      send = {
        id_token: createToken(user)
      }
    }

    return {
      status: status,
      send: send
    }
  }

  res.status(postRequest().status).send(postRequest().send);
});
