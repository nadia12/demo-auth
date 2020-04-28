'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model 
  class User extends Model {}
  
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user){
        const hash = bcrypt.hashSync(user.password, saltRounds)
        console.log(hash)
        user.password = hash
      }
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};