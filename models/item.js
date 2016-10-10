"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("item", {
    id: DataTypes.STRING,
    text: DataTypes.STRING,
    complete: DataTypes.booleanValue,
  });
};