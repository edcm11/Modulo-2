const mongoose = require('mongoose')
const Schema = mongoose.Schema

const causeSchema = new Schema({
  username:String,
  userInfo:String,
  contact:String,
  city:String,
  problem:String,
  description:String,
  mUtil:String,
  appre:String,
  chall:String,
  moGoal:Number,
  time:Number,
  photosUrl:String,

},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('User', causeSchema)