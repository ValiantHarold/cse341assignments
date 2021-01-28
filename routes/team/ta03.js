//TA03 PLACEHOLDER
const express = require('express');

const fetch = require('node-fetch');

const router = express.Router();

const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json"

router.get('/',(req, res, next) => {
    fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        const tags = [...new Set(jsObject.map(item => item.tags).flat())];
        res.render('pages/team/ta03', {
            items: jsObject,
            title: 'Team Activity 03', 
            path: '/ta03',
            tags: tags
        });
    });
});

router.post('/item-tags',(req, res, next) => {
    fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        const tags = [...new Set(jsObject.map(item => item.tags).flat())];
        jsObject = jsObject.filter(item => item.tags.includes(req.body.tags));
        res.render('pages/team/ta03', {
            items: jsObject,
            title: 'Team Activity 03', 
            path: '/ta03',
            tags: tags
        });
    });
});

module.exports = router;