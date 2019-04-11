const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port


mongoose.connect("mongodb+srv://dbUser:ledzeppelin7@cluster0-jccn7.mongodb.net/test?retryWrites=true");

module.exports = mongoose.connection
