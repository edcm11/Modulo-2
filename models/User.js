const mongoose = require('mongoose')
const Schema = mongoose.Schema
const plm = require('passport-local-mongoose')


const userSchema = new Schema({
  username:{
    type:String,
    unique:true
  },
  photoURL:String,
  email:String,
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

userSchema.plugin(plm, {usernameField:'email'})
module.exports = mongoose.model('User', userSchema)