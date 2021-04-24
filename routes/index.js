const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Filmdatabasen', messages: req.flash('info') });
});

router.get('/flash', function(req, res, next) {
  req.flash('info', 'flash message');
  res.redirect('/');
});

module.exports = router;
