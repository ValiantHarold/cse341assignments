const express = require('express');

const router = express.Router();

const prove01Routes = require('./prove01');
const prove02 = require('./prove02');

router
.use('/prove01', prove01Routes)
.use('/prove02', prove02)

module.exports = router;