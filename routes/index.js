const express = require('express');
const router = express.Router();
const { downloadImages } = require('../utils/download-images');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Filmdatabasen',
        messages: req.flash('info')
    });
});

router.get('/flash', function (req, res, next) {
    req.flash('info', 'flash message');
    res.redirect('/');
});

// vi gör en test route
router.get('/test', async function (req, res, next) {
    const dl = await downloadImages('155-the-dark-knight');
    res.json(dl);
});

module.exports = router;
