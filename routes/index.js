var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const products= [
    {name:"microondas", price:200, stock:6},
    {name:"tele", price:600, stock:3},
    {name:"lampara", price:20, stock:14},
    {name:"secadora", price:180, stock:5},
    {name:"lavadora", price:290, stock:3},
    {name:"cosa", price:180, stock:0}

  ];
  res.render('index', { title: 'clase333', products });
});

module.exports = router;
