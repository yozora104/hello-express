const Producto=require('./products');
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
  module.exports={Producto
  //,
//pedido,
//usuario,
//carrito
}
