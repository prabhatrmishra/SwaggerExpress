
/**
 * Module dependencies.
 */
var path = require('path');
var restify = require('restify');
var fs = require('fs');
var logger = require(path.join(__dirname, '..', 'util', 'logger'));
var common = require(path.join(__dirname, '..', 'api', 'common'));
var events = require('events');
var config = require(path.join(__dirname, '..', 'config'));

var express = require('express')
  , api = require('./api')
  , http = require('http')
  , path = require('path')
  , swagger = require('../');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

  app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['../model/organization/OrganizationController.js',
    './api.js', ]
   // './api.yml', 
  //  'api.coffee']
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', { title: 'Asset Inspection' });
});

app.post('/login', api.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
