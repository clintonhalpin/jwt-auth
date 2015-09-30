var logger = require('morgan'),
cors = require('cors'),
http = require('http'),
express = require('express'),
errorhandler = require('errorhandler'),
cors = require('cors'),
bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(require('./routes/protected-routes'));
app.use(require('./routes/user-routes'));

app.get('/', function(res, res){
  res.status(200).send('Light the fires and kick the tires');
});

var server = http.createServer(app);
var boot = function (quiet) {
  server.listen(app.get('port'), function(){
      console.info('Express server listening on http://localhost:%d', app.get('port'));
  });
}
  
var shutdown = function() {
  server.close();
}

if (require.main === module) {
  boot();
}
else {
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
