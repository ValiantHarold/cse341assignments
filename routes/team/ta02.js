//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const user = [];

router.get('/',(req, res, next) => {
    res.render('pages/team/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        names: user
    });
});

router.post('/addUser',(req, res, next) => {
    user.push(req.body.addUser);
    res.redirect('/team/ta02');
});

router.post('/removeUser',(req, res, next) => {
    for (let i = 0; i < user.length; i++) {
        if (user[i] == req.body.removeUser) {
            user.splice (i, 1);
        };
    };
    res.redirect('/team/ta02');
});

module.exports = router;