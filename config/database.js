const mysql = require("mysql2");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('theme', 'root', 'sonu', {
  host: 'localhost',
  dialect: 'mysql',
  pool: { max: 20, min: 0, idle: 10000 }
});

sequelize.authenticate().then(() => {
  console.log("connected")
})
  .catch(err => {
    console.log("Error" + err)
  })



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.auth = require("../models/auth")(sequelize,DataTypes);
db.otp = require("../models/otp")(sequelize,DataTypes);

//db.auth.hasMany(db.users);
//db.users.belongsTo(db.auth);

db.sequelize.sync({force: false})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;

//let db = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password: 'sonu',
//  database: 'test',
//});
