var express = require('express');
var router = express.Router();
var products = require('../models/products.js');
var users = require('../models/users.js');
const {Producto, Usuario}=require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.session.username;
  Producto.findAll().then(products=>{
    // console.log(products);
    res.render('index', { title: 'Amazon tiembla ', username, products });

  })
  
});

//pagina con los detalles de un producto, segun su referencia
router.get('/products/:ref', function (req, res, next) {
  // Obtengo la referencia del producto a partir de la ruta
  var ref = req.params.ref;
  Producto.findOne({
    where: {ref}
  })
  .then(product => {
    
  if (product) {
    // Pasamos los datos del producto a la plantilla
    res.render('product', {product});
  } else {
    // Si no encontramos el producto con esa referencia, redirigimos a página de error.
    res.redirect("/error");
  }
})
});

var cesta = []; //provisional

router.post("/comprar", function (req, res, next) {
  const ref = req.body.ref;

  // Busco entre los productos el que coincide con la referencia
  const product = products.find(function(p) { 
    return p.ref==ref; 
  });

  // Añadimos producto a la cesta
  cesta.push(product);
  // Redirigimos a página de productos
  res.redirect("/");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

/**
 * Procesamiento del formulario de login. Obtiene los datos del formulario en la
 * petición (req) y comprueba si hay algún usuario con ese nombre y contraseña.
 * Si coincide, genera una cookie y dirige a la página principal.
 * Si no coincide, vuelve a cargar la página de login para mostrar un error.
 */
router.post("/login", function (req, res, next) {
  const {email, pass} = req.body;
  Usuario.findOne({where:{email,pass}})
  .then(usuario=>{
    if (usuario) {
      req.session.usuarioId = usuario.id;
      res.redirect("/");
    } else {
      //TODO: inyectar mensaje de error en plantilla
      res.render("/login");
    }
  })
    
});

router.get("/registro",function (req,res,next){
  res.render("registro",{error:undefined, datos:{}});
});
router.post("/registro", function (req, res, next) {
  const datos = req.body;
  if (datos.nombre.length==0){
    res.render("registro",{datos, error:"Nombre vacio"});

  } else
  if (datos.apellidos.length==0){
    res.render("registro", {datos, error:"Apellidos vacio"});
  } else if (datos.email.length==0){
    res.render("registro", {datos, error:"Email vacio"});
  } else
if(!/^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/.test(datos.email))
{
  res.render("registro",{datos,error:"Email no valido"});
}
if ((datos.pass.length<6))
 {
  res.render("registro", {datos, error:"Contraseña debe de tener al menos 6 caracteres"});
} else
if (datos.pass!=datos.pass2){
  res.render("registro", {datos, error:"Contraseña no coincide"});
}else {
    Usuario.create(datos)                   
    .then(Usuario=>{
      res.redirect("/login");
  });
  }
});

module.exports = router;

