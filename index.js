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
        return reply('hello world');
    }
});

server.route({
    method: 'GET',
    path:'/excel',
    handler: function (request, reply) {
        reply.file('./public/interview.xlsx');
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
