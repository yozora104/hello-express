const Producto=require('./products');
const Usuario=require('./users');
const Pedido=require('./pedido');
const Carrito=require('./carrito');
const sequelize = require('./db');
const ProductoCarrito=require('./producto_carrito');
const ProductoPedido=require('./producto_pedido');
Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);
Carrito.belongsToMany(Producto,{through:ProductoCarrito});
Producto.belongsToMany(Carrito,{through:ProductoCarrito});
Producto.belongsToMany(Pedido,{through:ProductoPedido});
Pedido.belongsToMany(Producto,{through:ProductoPedido});

//Conectamos con la BD
sequelize
 
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    sequelize.sync({alter:true});

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
 
  module.exports={sequelize, Producto, Usuario,Pedido,Carrito
  }
