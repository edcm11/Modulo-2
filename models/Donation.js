const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationSchema = new Schema({
  numbersOD:Number,
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Donation', donationSchema)