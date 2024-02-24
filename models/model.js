const Sequelize = require('sequelize');

const sequelize = new Sequelize('notedb', 'root', '', { host: 'localhost', dialect: 'mysql' });

sequelize.authenticate().then(() => {
    console.log("connected with db");
}).catch(err => {
    console.log("error occured", err)
})


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users.model')(sequelize, Sequelize)
db.notes  = require('./Notes.model')(sequelize, Sequelize)

module.exports = db;