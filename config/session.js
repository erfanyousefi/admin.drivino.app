const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = {
     secret: 'secretkey',
     resave: true,
     saveUninitialized: true,
     cookie: {expires: new Date(Date.now() + 1000*60*60*24)},
     store : new mongoStore({mongooseConnection:mongoose.connection}),
}