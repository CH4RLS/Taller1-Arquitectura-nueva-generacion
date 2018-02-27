/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider
  , amqp = require('amqplib/callback_api');

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

var employeeProvider= new EmployeeProvider('localhost', 27017);

var connection = amqp.createConnection

//new employee
app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'Registrar Proveedor'
    });
});
app.post('/employee/new', function(req, res){
amqp.connect('amqp://test:test@' + '192.168.50.4' + ':5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'create';
    var msg = req.param('tipo') + ';' + req.param('num') + ';' + req.param('name');
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); res.redirect('/') }, 500);
});
});


app.listen(process.env.PORT || 3000);
