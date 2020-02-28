const Sequelize = require('sequelize');
const sequelize=require('./db');
//Definimos modelo para producto
const carrito = sequelize.define('carrito', {
    cantidad: Sequelize.INTEGER
    });
    module.exports=carrito;