const Sequelize = require('sequelize');
const sequelize=require('./db');
const pedido=require('./pedido');
//Definimos modelo para producto
const carrito = sequelize.define('carrito', {
 
    });
    module.exports=carrito;