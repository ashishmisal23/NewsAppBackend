require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection

connection.on('connected', () => {
    console.log('Mongo DB Connection Successfull')
})

connection.on('error', () => {
    console.log('Mongo DB Connection Failed')
})

module.exports = mongoose;
