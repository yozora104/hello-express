var express = require('express');
var router = express.Router();
var products=require("../models/products.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'clase333', products });
});

router.get('/products/:ref', function (req,res,next){
  // obtengo la referencia del producto a partir de la ruta
  var ref=req.params.ref;
  //busco entre los productos el que coincide con la referencia
  const product = products.find(function(p){
    return p.ref==ref;
  })
  //pasamos los datos del producto a la plantilla
  res.render('product',{product});
});

module.exports = router;
