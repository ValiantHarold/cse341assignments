// Routes for W08 Prove Assignment.
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove09', {
        title: 'Pokemon API', 
        path: '/prove09'
    });
});
module.exports = router;