const mongoose = require('mongoose')
const Schema = mongoose.Schema
const plm = require('passport-local-mongoose')

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
  photosUrl:String,
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

causeSchema.plugin(plm)
module.exports = mongoose.model('Cause', causeSchema)