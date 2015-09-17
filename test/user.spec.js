var expect = require("chai").expect;
var request = require("request");
var boot = require('../server').boot;
var port = require('../server').port;
var shutdown = require('../server').shutdown;

describe("API", function(){
    var url = "http://localhost:" + port + "/";

    before(function () {
      boot();
    });

    it("POST to /sessions/create w/o creds won't work", function(done) {
      request.post(url + 'sessions/create', function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it("POST to /sessions/create with valid creds works", function(done) {
      
      var options = {
        url: url + 'sessions/create',
        form: {
          username: 'gonto',
          password: 'gonto'
        }
      };

      request.post(options, function(error, response, body) {
        expect(body.id_token);
        expect(response.statusCode).to.equal(201);
        done();
      });

    });

    after(function () {
      shutdown();
    });
})