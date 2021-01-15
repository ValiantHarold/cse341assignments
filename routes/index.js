const express = require('express');

const router = express.Router();

const prove = require('./prove');
const team = require('./team');

router
.use('/prove', prove)
.use('/team', team)
.get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('pages/index', {
        title: 'Welcome to my CSE341 repo', 
        path: '/'
    });
})
.use((req, res, next) => {
    // 404 page
    res.render('pages/404', {
        title: '404 - Page Not Found', 
        path: req.url
    });
});

module.exports = router;