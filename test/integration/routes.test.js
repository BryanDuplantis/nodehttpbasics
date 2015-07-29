var expect = require('chai').expect;

var http = require('http');
var path = require('path');

describe('routes', function () {
  this.timeout(30000);

  var port = Math.floor(Math.random() * 50000 + 10000);
  var url = 'http://localhost:' + port;

  before(function () {
    require(path.join(process.cwd(), '/lib/server'))(port);
  });

  it('should not respond to the /nonexisting route', function (done) {
    http.get(url +'/nonexisting', function (res) {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });

  it('should respond to the /weather route', function (done) {
    http.get(url +'/weather', function (res) {
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

  it('should respond to the /starwarsmovies route', function (done) {
    http.get(url +'/starwarsmovies', function (res) {
      var body = '';

      expect(res.statusCode).to.equal(200);

      res
        .on('data', function (chunk) {
          body += chunk;
        })
        .on('end', function () {
          expect(body).to.contain('A New Hope');
          done();
        });
    });
  });

  describe('cal', function () {
    var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    it('should respond to the /cal route', function (done) {
      var now = new Date()
      var month = MONTH_NAMES[now.getMonth()];
      var year = now.getFullYear();

      http.get(url + '/cal', function (res) {
        var body = '';

        expect(res.statusCode).to.equal(200);

        res
          .on('data', function (chunk) {
            body += chunk;
          })
          .on('end', function () {
            expect(body).to.contain(month + ' ' + year);
            done();
          });
      });
    });

    it('should respond to the /cal/2015 route', function (done) {
      http.get(url + '/cal/2015', function (res) {
        var body = '';

        expect(res.statusCode).to.equal(200);

        res
          .on('data', function (chunk) {
            body += chunk;
          })
          .on('end', function () {
            expect(body).to.contain(2015);
            MONTH_NAMES.forEach(function(m) {
              expect(body).to.contain(m);
            });
            done();
          });
      });
    });

    it('should respond to the /cal/2015/1 route', function (done) {
      http.get(url + '/cal/2015/1', function (res) {
        var body = '';

        expect(res.statusCode).to.equal(200);

        res
          .on('data', function (chunk) {
            body += chunk;
          })
          .on('end', function () {
            expect(body).to.contain('January 2015');
            done();
          });
      });
    });

    it('should respond to the /cal/1/2015 route', function (done) {
      http.get(url + '/cal/1/2015', function (res) {
        var body = '';

        expect(res.statusCode).to.equal(200);

        res
          .on('data', function (chunk) {
            body += chunk;
          })
          .on('end', function () {
            expect(body).to.contain('January 2015');
            done();
          });
      });
    });
  });
});
