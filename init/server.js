var path = require('path');
var restify = require('restify');
var fs = require('fs');
var SwaggerRestify = require('swagger-restify-mw');
var logger = require(path.join(__dirname, '..', 'util', 'logger'));
var common = require(path.join(__dirname, '..', 'api', 'common'));
var orderCtrl = require(path.join(__dirname, '..', 'Orders', 'OrdersController'));
var events = require('events');
var config = require(path.join(__dirname, '..', 'config'));
config.HTTP_PORT = config.HTTP_PORT || 9100;
config.HTTPS_PORT = config.HTTPS_PORT || 9101;
const PORT = process.env.PORT || 5000

exports.start = function() {

    var httpServer = {};
    let timerId = null,
    sockets = new Set();
    if(config.SSLOn) {
        httpServer = restify.createServer({
            name: 'Service_Server',
            version: config.version,
        });
    } else {
        httpServer = restify.createServer({
            name: 'Service_Server',
            version: config.version
        });
    }
    var io = require('socket.io')(httpServer.server);
    var crossDomain = require(path.join(__dirname, '..', 'api', 'crossDomain'));
    crossDomain(httpServer);
    io.on('connection', socket => {

            var commonEmitter = common.commonEmitter;
            commonEmitter.on('orderUpdateEvent', function (data) {
            console.log('First subscriber: ' + data);
            socket.emit('data', { data: "updated",code :'121' });
    });


    sockets.add(socket);
    console.log(`Socket ${socket.id} added`);
    socket.on('clientdata', data => {
    console.log(data);
  });
    socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id}`);
    sockets.delete(socket);
    console.log(`Remaining sockets: ${sockets.size}`);
  });

});

    var parser = require(path.join(__dirname, '..', 'api', 'parser'));
    parser(httpServer);

    if(config.SSLOn) {
        httpServer.listen(PORT, function() {
            logger.info('Worker(HTTPS Server)', process.pid, 'started at', cPORT);
        });
    } else {
        httpServer.listen(PORT, function() {
            logger.info('Worker(HTTP Server)', process.pid, 'started at', PORT);
        });
    }

    // to connect with postgres db server

    var postgresServer = require(path.join(__dirname, '..', 'api', 'dbServer'));

    postgresServer(httpServer);

    // To import routes
    var rulesApi = require(path.join(__dirname, '..', 'routes', 'rulesApi'));
    rulesApi(httpServer);
};
