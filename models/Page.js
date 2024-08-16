const Sequelize = require('sequelize')
const db = require('../database/db.js')
var nametable = 'page';
var Page = db.sequelize.define(nametable,{

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
})
module.exports = Page
