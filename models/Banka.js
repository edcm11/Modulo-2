const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankaSchema = new Schema({
  nombre:String,
  apellidop:String,
  apellidom:String,
  fnacimiento:Date,
  callen:String,
  numi:String,
  ciudad:String,
  estado:String,
  zip:Number,
  rfc:String,
  cause:{
    type:Schema.Types.ObjectId,
    ref:'Cause'
  }
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Banka', bankaSchema)