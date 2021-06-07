require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});


const db = mongoose.connection;

//Setup event fro db to print connection
db.once('open', () => {
    console.log(`Connect to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', err => console.log (`Database error`, err));

//Import all models

const User = require('./User');


//Export all models from file
module.exports = {
    User
}