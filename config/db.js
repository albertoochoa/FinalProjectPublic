const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
console.log('gettinghere');

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_URI); 
      console.log('MongoDB Connected...');
  } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); 
  }
};

module.exports = connectDB;


// "use strict";
// const MongoClient = require('mongodb').MongoClient;
// const MONGODB_URI = process.env.DB_URI; // or Atlas connection string
// let cachedDb = null;

// function connectToDatabase(uri) {
// 	console.log('=> connect to database');
// 	if (cachedDb) {
// 		console.log('=> using cached database instance');
// 		return Promise.resolve(cachedDb);
// 	}
// 	return MongoClient.connect(uri)
// 		.then(db => {
// 			cachedDb = db; //For mongo client before v3
// 			cachedDb = db.db("items"); //For mongo client v3,item is db i creted
// 			return cachedDb;
// 		});
// }

// function queryDatabase(db) {
// 	console.log('=> query database');
// 	return db.collection('fruits').find({}).toArray()
// 		.then(() => {
// 			return {
// 				statusCode: 200,
// 				body: 'success'
// 			};
// 		})
// 		.catch(err => {
// 			console.log('=> an error occurred: ', err);
// 			return {
// 				statusCode: 500,
// 				body: 'error'
// 			};
// 		});
// }
// module.exports.handler = (event, context, callback) => {
// 	context.callbackWaitsForEmptyEventLoop = false;
// 	console.log('event: ', event);
// 	connectToDatabase(MONGODB_URI)
// 		.then(db => queryDatabase(db))
// 		.then(result => {
// 			console.log('=> returning result: ', result);
// 			callback(null, result);
// 		})
// 		.catch(err => {
// 			console.log('=> an error occurred: ', err);
// 			callback(err);
// 		});
// };