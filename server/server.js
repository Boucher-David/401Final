'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('express')();

app.use(require(__dirname + '/routes.js'));

// add helmet



module.exports = {
    start: () => {
  
      http = app.listen(process.env.PORT || 3000, () => {
          isRunning = true;
          mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vault_dev', {useMongoClient: true});   
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
  