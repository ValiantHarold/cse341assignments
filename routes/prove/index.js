const express = require('express');

const router = express.Router();

const prove01Routes = require('./prove01');
const prove02 = require('./prove02');
const prove08 = require('./prove08');
const prove09 = require('./prove09');

router
.use('/prove01', prove01Routes)
.use('/prove02', prove02)
.use('/prove08', prove08)
.use('/prove09', prove09)

module.exports = router;