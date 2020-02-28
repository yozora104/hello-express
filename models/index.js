const Producto=require('./products');
const Usuario=require('./users');
const Pedido=require('./pedido');
const Carrito=require('./carrito');
const sequelize = require('./db');
Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
// Usuario.hasMany(Pedido);
// Pedido.belongsTo(Usuario);
// Producto.belongsToMany(Carrito);
// Producto.belongsToMany(Pedido);
// Producto.belongsToMany(Carrito);
// Pedido.hasMany(Usuario);
// Pedido.belongsTo(Usuario);
// Producto.hasMany(Pedido);
// Pedido.belongsToMany(Producto);
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
 
  module.exports={Producto, Usuario,Pedido,Carrito
  }
