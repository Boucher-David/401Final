'use strict';

const express = require('express');
const app = module.exports = express.Router();

app.get('*', (req, res, next) => {
    res.send("Testing Route");
});