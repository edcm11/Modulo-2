const mongoose = require('mongoose')
const Schema = mongoose.Schema

const causeSchema = new Schema({
  cause:String,
  username:String,
  city:String,
  problem:String,
  description:String,
  moGoal:Number,
  mUtil:String,
  time:Number,
  appre:String,
  photosUrl:String
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Cause', causeSchema)