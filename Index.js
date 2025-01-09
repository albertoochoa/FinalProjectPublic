// // const Hapi = require('@hapi/hapi');
// // const dotenv = require('dotenv');
// // const connectDB = require('./config/db');
// // const routes = require('./handlers/router');

// // dotenv.config();

// // const createServer = async () => {
// //     const server = Hapi.server({
// //         port: process.env.PORT || 3000, // Port is not relevant for Lambda
// //         host: 'localhost',
// //     });

// //     // Connect to the database
// //     await connectDB();

// //     // Register routes
// //     server.route(routes);

// //     // Initialize the server (but do not start)
// //     await server.initialize();

// //     console.log('Hapi server initialized successfully.');
// //     return server;
// // };

// // module.exports = createServer;











const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./handlers/router');



dotenv.config();

const server = new Hapi.Server({
    port: 3000,
    host: 'localhost',
});

const init = async () => {
    try {
        await connectDB();
        server.route(routes);
        await server.start();
        console.log('Server running on:', server.info.uri);
    } catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
}; 
connectDB();


process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.stop({ timeout: 10000 });
    console.log('Server stopped.');
    process.exit(0);
});

init();







// index.js
// const Hapi = require('@hapi/hapi');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const routes = require('./handlers/router');
// const serverless = require('serverless-http');

// dotenv.config();

// /**
//  * 1. Creamos la instancia del servidor, pero NO lo arrancamos.
//  */
// async function createServer() {
//   // Crea el servidor
//   const server = Hapi.server({
//     port: process.env.PORT || 3000,
//     host: 'localhost'
//   });

//   // Conecta la base de datos
//   await connectDB();

//   // Registra tus rutas
//   server.route(routes);

//   // Inicializa el servidor (pero no llamamos a server.start())
//   await server.initialize();

//   console.log('Hapi server initialized successfully.');

//   // Retornamos la instancia de Hapi
//   return server;
// }

// /**
//  * 2. Configuramos un "handler" para serverless, que al primer request
//  *    inicialice el servidor y luego use serverless-http.
//  */
// let slsHandler;  // este quedará cacheado después de la primera invocación

// module.exports.handler = async (event, context) => {
//   // Si es la primera vez que se llama (frío), inicializamos el servidor:
//   if (!slsHandler) {
//     const server = await createServer();
//     // Ojo: serverless-http necesita el "listener" nativo de Node
//     slsHandler = serverless(server.listener);
//   }

//   // Luego delegamos la invocación al handler de serverless-http
//   return slsHandler(event, context);
// };






// const Hapi = require('@hapi/hapi');
// const serverless = require('serverless-http');
// const routes = require('./handlers/router');


// const init = async () => {
//   const server = Hapi.server({
//     port: 3000,
//     host: 'localhost',
//   });

//   // Add your routes here
//   server.route(routes);

//   await server.initialize();
//   return server;
// };

// let cachedServer;

// const getServer = async () => {
//   if (!cachedServer) {
//     cachedServer = await init();
//   }
//   return cachedServer;
// };

// module.exports.handler = async (event, context) => {
//   const server = await getServer();
//   const request = serverless(server);
//   return request(event, context);
// };


