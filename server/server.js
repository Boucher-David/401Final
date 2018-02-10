'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const cors = require('cors');


const app = require('express')();
app.use(cors());
app.use(require(__dirname + '/routes.js'));

// add helmet



let http = null;
let isRunning = null;

module.exports = {
    start: () => {    
        http = app.listen(process.env.PORT || 3000, () => {
          console.log(`Server running on PORT: ${process.env.PORT || 3000}`);
          isRunning = true;
          mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vault_dev');   
        });
      },
  
    stop: () => {
      http.close(() => {
        mongoose.disconnect();
        http = null;
        isRunning = false;
        return;
      });
    },
  }