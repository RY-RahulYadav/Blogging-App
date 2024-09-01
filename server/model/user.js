const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // e.g., "ry"
  name:{type:String , required:true},
  email: { type: String, required:true }, // Automatically sets the date,
  password:{ type: String, required:true }
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
