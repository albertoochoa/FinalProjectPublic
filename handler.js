const serverless = require('serverless-http');
const createServer = require('./server.js');

let cachedHandler; // Cache the serverless handler for performance

module.exports.hapiHandler = async (event, context) => {
    // Lazy initialization of the server
    if (!cachedHandler) {
        const server = await createServer();
        cachedHandler = serverless(server.listener); // Wrap the server
    }

    // Handle the event
    return cachedHandler(event, context);
};
