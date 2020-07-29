const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,{
useNewUrlParser: true})
   .then( db => console.log('db is connected'))
   .catch(err => console.log(err));

module.exports = mongoose;