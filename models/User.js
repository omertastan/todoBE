const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})
const userModel = mongoose.model('user', UserSchema)
module.exports = userModel
