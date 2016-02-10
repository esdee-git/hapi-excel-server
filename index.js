'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.register([Inert, Vision], function () {});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        reply.view('index').code(200);
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.route({
    method: 'GET',
    path:'/excel',
    handler: function (request, reply) {
      var filename = __dirname + '/public/interview.xlsx';
      var XLSX = require('xlsx');
      var workbook = XLSX.readFile(filename);
      var sheetnames = workbook.SheetNames;
      var name = sheetnames[0];
      var worksheet = workbook.Sheets[name];
      var sheetdata = XLSX.utils.sheet_to_json(worksheet);
      reply(sheetdata).code(200);
    }
});

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './layouts',
    helpersPath: './helpers',
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
