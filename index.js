'use strict';

require('dotenv').config();

try {
    require('./server/server.js').stop();
} catch (error) {
    require('./server/server.js').start();
}