var expect = require('chai').expect;
var http = require('http');
var path = require('path');

describe('routes', function () {
  this.timeout(30000);

  var port = Math.floor(Math.random() * 50000 + 10000);

  before(function () {
    require(path.join(process.cwd(), '/lib/server'))();
  });

  it('should respond to the /weather route', function (done) {
    http.get('http://localhost:1337/weather', function (res) {
      var body = '';

      expect(res.statusCode).to.equal(200);

      res
        .on('data', function (chunk) {
          body += chunk;
        })
        .on('end', function () {
          expect(body).to.contain('temperature');
          done();
        });
    });
  });
});
