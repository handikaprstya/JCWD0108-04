'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user);
      transaction.hasMany(models.transDetail);
    }
  }
  transaction.init({
    total: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    buyerAmmount : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    buyerChange : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : true,
    }
  }, {
    sequelize,
    modelName: 'transaction',
    updatedAt : false,
    freezeTableName : true
  });
  // transaction.removeAttribute('id');
  return transaction;
};