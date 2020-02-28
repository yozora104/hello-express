const Sequelize = require('sequelize');
const sequelize=require('./db');
//Definimos modelo para producto
const pedido = sequelize.define('pedido', {
    estado: Sequelize.ENUM('NO_Pagado','Pagado','Cancelado','En_transito','Completo'),
    direccionEntrega:Sequelize.STRING(200)
    });
    module.exports=pedido;