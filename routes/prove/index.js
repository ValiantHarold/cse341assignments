const express = require('express');

const router = express.Router();

const prove01Routes = require('./prove01');
const prove02 = require('./prove02');
const prove08 = require('./prove08');
const prove09 = require('./prove09');
const prove10 = require('./prove10');
const prove11 = require('./prove11');

router
.use('/prove01', prove01Routes)
.use('/prove02', prove02)
.use('/prove08', prove08)
.use('/prove09', prove09)
.use('/prove10', prove10)
.use('/prove11', prove11)

module.exports = router;