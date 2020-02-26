const Sequelize = require('sequelize');

//Primero definimos sequelize con los parametros de conexion
const sequelize = new Sequelize('tiendaonline', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

//Definimos modelo para producto
const producto = sequelize.define('producto', {
nombre: Sequelize.STRING,
ref:Sequelize.INTEGER,
imagen:Sequelize.STRING,
precio:Sequelize.DECIMAL(10,2),
stock:Sequelize.INTEGER,
descripcion:Sequelize.STRING
});

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