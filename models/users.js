const Sequelize = require('sequelize');
const sequelize=require('./db');
//Definimos modelo para producto
const users = sequelize.define('usuario', {
    nombre: Sequelize.STRING(50),
    apellidos: Sequelize.STRING(80),
    email: Sequelize.STRING(50),
    pass: Sequelize.STRING(25)
    });
    module.exports=users;