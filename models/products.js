const Sequelize=require('sequelize');
const sequelize=require('./db');

//Definimos modelo para producto
const producto = sequelize.define('producto', {
  nombre: Sequelize.STRING,
  ref:Sequelize.INTEGER,
  imagen:Sequelize.STRING,
  precio:Sequelize.DECIMAL(10,2),
  stock:Sequelize.INTEGER,
  descripcion:Sequelize.STRING
  });
  module.exports=producto;