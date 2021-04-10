require('dotenv').config();
/*
 * Establish a connection to Database
 */

require('./data/connectDB')(true);
require('./app.js');
