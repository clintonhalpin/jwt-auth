var expect = require("chai").expect;
var request = require("request");
var boot = require('../server').boot;
var port = require('../server').port;
var shutdown = require('../server').shutdown;

describe("Authorization", function(){
    var url = "http://localhost:" + port + "/";
    before(function () {
      boot();
    });

    it("should fail POST to authorization/sign-in", function(done) {
      request.post(url + 'authorization/sign-in', function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it("should succeed POST authorization/sign-in with valid credentials", function(done) {
      var options = {
        url: url + 'authorization/sign-in',
        form: {
          username: 'gonto',
          password: 'gonto'
        }
      };
      request.post(options, function(error, response, body) {
        expect(JSON.parse(body).id_token).to.be.a('string');;
        expect(response.statusCode).to.equal(201);
        done();
      });

    });

    it("should succeed POST to authorization/sign-up with valid credentials", function(done) {
      var options = {
        url: url + 'authorization/sign-up',
        form: {
          username: 'yolo',
          password: 'yolo'
        }
      };
      request.post(options, function(error, response, body) {
        expect(JSON.parse(body).id_token).to.be.a('string');;
        expect(response.statusCode).to.equal(201);
        done();
      });

    });

    it("should succeed GET api/protected with valid credentials", function(done) {
      var options = {
        url: url + 'authorization/sign-in',
        form: {
          username: 'gonto',
          password: 'gonto'
        }
      };
      request.post(options, function(error, response, body) {
        var authorizedURL = {
          url: url + 'api/protected',
          headers: {
            Authorization: 'Bearer ' + JSON.parse(body).id_token
          }
        }
        request.get(authorizedURL, function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        })
      });

    });

    after(function () {
      shutdown();
    });
})
