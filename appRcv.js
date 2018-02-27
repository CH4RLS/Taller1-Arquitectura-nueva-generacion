/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , amqp = require('amqplib/callback_api')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var employeeProvider= new EmployeeProvider('localhost', 27017);


amqp.connect('amqp://test:test@' + '192.168.50.4' + ':5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'create';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      message = msg.content.toString(),
      topic = message.split(';'),  
      employeeProvider.save({
        tipo : topic[0],
        num : topic[1],
        name : topic[2],
        }, function( error, docs) {
    });
    }, {noAck: true});
console.log("Connection succesful");
 });
});
app.listen(process.env.PORT || 3001);