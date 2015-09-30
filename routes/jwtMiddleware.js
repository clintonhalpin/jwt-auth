var expressJwt = require('express-jwt'),
    config = require('./../config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken');

/*
decode()
Middleware that decorates req.user with decoded JWT token
*/

module.exports.decode = expressJwt({
    secret: config.secret
})

/*
sign()
@param { Object } object containing the users credentials
*/

module.exports.sign = function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}


