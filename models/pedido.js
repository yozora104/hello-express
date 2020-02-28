const Sequelize = require('sequelize');
const sequelize=require('./db');
//Definimos modelo para producto
const pedido = sequelize.define('pedido', {
    pagado: Sequelize.BOOLEAN
    });
    module.exports=pedido;