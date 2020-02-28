const Sequelize=require('sequelize');
const sequelize=require('./db');

//Definimos modelo para producto
const producto = sequelize.define('producto', {
  nombre: Sequelize.STRING(40),
  ref:Sequelize.INTEGER,
  imagen:Sequelize.STRING(20),
  precio:Sequelize.DECIMAL(10,2),
  stock:Sequelize.INTEGER,
  descripcion:Sequelize.STRING(100)
  });
  module.exports=producto;