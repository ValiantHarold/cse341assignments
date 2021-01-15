const express = require('express');

const router = express.Router();

const books = [];

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove02input', {
        title: 'Input Data', 
        path: '/prove02input', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true
    });
});

router.post('/', (req, res, next) => {
  books.push({ 
    title: req.body.title,
    description: req.body.description
  });
  res.render('pages/prove/prove02display', {
    title: 'Display Data',
    books: books,
    path: '/prove/prove02'
  });
});

module.exports = router;