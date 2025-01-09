const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./handlers/router');

dotenv.config();

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000, // Port is not relevant for Lambda
        host: 'localhost',
    });

    // Connect to the database
    await connectDB();

    // Register routes
    server.route(routes);

    // Initialize the server (but do not start)
    await server.initialize();

    console.log('Hapi server initialized successfully.');
    return server;
};

module.exports = createServer;
