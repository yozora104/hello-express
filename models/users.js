const Sequelize = require('sequelize');
const sequelize=require('./db');
//Definimos modelo para producto
const users = sequelize.define('usuario', {
    nombre: { type:Sequelize.STRING(50), allowNull:false},
    apellidos:{ type:Sequelize.STRING(80), allowNull:false},
    email:{ type:Sequelize.STRING(50), allowNull:false, unique:true},
    pass: { type:Sequelize.STRING(40), allowNull:false}});
    module.exports=users;