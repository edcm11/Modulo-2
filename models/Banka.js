const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankaSchema = new Schema({
  cause:String,
  type:['monetary','moral']
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Banka', bankaSchema)