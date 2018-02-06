'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const helmet = require('helmet');
const cors = require('helmet');
const app = require('express')();



app.use(require(__dirname + '/routes.js'));
app.use(cors());
// add helmet
app.use(helmet());


let http = null;
let isRunning = null;

module.exports = {
    start: () => {    
        http = app.listen(process.env.PORT || 3000, () => {
          console.log(`Server running on PORT: ${process.env.PORT || 3000}`);
          isRunning = true;
          mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vault_dev',);   
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
  