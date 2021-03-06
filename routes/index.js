var express = require('express');
var router = express.Router();
var users = require('../models/users.js');

const { Producto, Usuario, Carrito, Pedido, sequelize } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.session.username;

  Producto.findAll().then(products => {    
    res.render('index', { title: 'The Jungle', username, products });
  })
});

/**
 * Página con los detalles de un producto, según su referencia.
 */
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
  Producto.findOne({where: {ref}})
  .then(producto => {
    if (producto) {
      // Localizamos carrito y ponemos producto en carrito
      const usuarioId = req.session.usuarioId;
      if (!usuarioId) res.redirect("/login");
      Carrito.findOrCreate({where: {usuarioId}, include: [Producto], defaults: {usuarioId}})
      .then(([carrito, created]) => {
        var productos = carrito.productos;
        var p = productos.find(p => p.ref==ref);
        if (p) {
          p.productocarrito.increment({cantidad: 1})
          .then(() => {
            // Redirigimos a página de productos
            res.redirect("/carrito");
          })
          //TODO: incrementar cantidad
        } else {
          carrito.addProducto(producto)
          .then(() => {
            // Redirigimos a página de productos
            res.redirect("/carrito");
          })
        }
      })
    } else {
      // Mostrar página de error
      res.render("error", {message: "No existe el producto solicitado"});
    }
  });
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

  Usuario.findOne({where: {email, pass}})
  .then(usuario => {
    if (usuario) {
      req.session.usuarioId = usuario.id;
      res.redirect("/");
    } else {
      //TODO: inyectar mensaje de error en plantilla
      res.render("login");
    }
  })


});


router.get("/registro", function (req, res, next) {
  res.render("registro", {error:undefined});
});


router.post("/registro", function (req, res, next) {
  const datos = req.body;

  if (datos.nombre.length==0) {
    res.render("registro", {datos, error:"El nombre no debe ir en blanco."})
  }
  else if (datos.apellidos.length==0) {
    res.render("registro", {datos, error:"Los apellidos no deben ir en blanco."})
  }
  else if (datos.email.length==0) {
    res.render("registro", {datos, error:"El email no debe ir en blanco."})
  }
  else if (datos.pass.length<6) {
    res.render("registro", {datos, error:"La contraseña debe tener al menos 6 caracteres."})
  }
  else if (datos.pass != datos.pass2) {
    res.render("registro", {datos, error:"Las contraseñas no coinciden."})
  }
  else {
    Usuario.create(datos)
    .then(usuario => {
      res.redirect("/login");
    })
  }

});


router.get("/carrito", function (req, res, next) {
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) res.redirect("/login");
  else {
    Carrito.findOne({where:{usuarioId}, include:[Producto]})
    .then(carrito => {
      const productos = carrito.productos;
      const total = productos.reduce((total, p) => total + p.precio * p.productocarrito.cantidad, 0);
      res.render("carrito", {productos, total});
    })
  }
});


router.post("/checkout", function (req, res, next) {
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) res.redirect("/login");
  else {
      sequelize.transaction(t => {
        return Carrito.findOne({where:{usuarioId}, include:[Producto]}, {transaction: t})
        .then(carrito => {
          const productos = carrito.productos;
          if (productos.every(p => p.existencias >= p.productocarrito.cantidad)) {
            //Niveles de existencias OK, crear nuevo pedido con los productos
            return Pedido.create({usuarioId, estado:'NO_Pagado'}, {transaction: t})
            .then(pedido => 
              pedido.addProductos(productos, {transaction: t})
              .then(() => carrito.removeProductos(productos, {transaction: t}))
              .then(() => t.commit())
              .then(() => res.redirect("/pedido/" + pedido.id))
            )
          } else {
            // mostrar un mensaje diciendo que no hay existencias suficientes
            productos.forEach(p => {
              p.hayExistencias = p.existencias >= p.productocarrito.cantidad;
            });

            const total = productos.reduce((total, p) => total + p.precio * p.productocarrito.cantidad, 0);

            return t.rollback()
            .then(() => res.render("carrito", {productos, total}));
          }
        })
      })
  }
});


module.exports = router;