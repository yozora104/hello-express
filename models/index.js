const Producto=require('./products');
const Usuario=require('./users');
const Pedido=require('./pedido');
const Carrito=require('./carrito');
const sequelize = require('./db');

//Conectamos con la BD
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  module.exports={Producto, Usuario,Pedido,Carrito
  }
