'use strict';
const {
  Model
} = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category);
      product.hasMany(models.transDetail);
      
    }
  }
  product.init({
    productName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    productDesc : {
      type : DataTypes.STRING,
      allowNull : false
    },
    productImg : {
      type : DataTypes.STRING,
      allowNull : false
    },
    productPrice :{
      type : DataTypes.INTEGER,
      allowNull : false
    },
    productQty : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    isDisabled : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'product',
    freezeTableName : true
  });
  return product;
};