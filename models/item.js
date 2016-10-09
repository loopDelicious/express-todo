"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("item", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
};
