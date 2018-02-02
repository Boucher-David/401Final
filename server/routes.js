'use strict';

const express = require('express');
const app = module.exports = express.Router();

// (emailAddress, code) -> then or catch
const email = require('./lib/email');

app.get('*', (req, res, next) => {
    res.send("Testing Route");
});