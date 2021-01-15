const path =require('path');

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/',(req, res, next) => {
    res.render('pages/prove/input', { 
        title: 'Slap Them Inputs', 
        path: '/input', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });    
});

router.post('/',(req, res, next) => {
    const a = req.body.input1;
    const b = req.body.input2;
    res.render('pages/prove/display', { 
        title: 'Thoroughly SLAPPED', 
        path: '/display', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        input1: a,
        input2: b,
    });
});

module.exports = router;