const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
	email:{type:String, required:true, unique:true},
	password:{type:String, min:6}
})

module.exports = mongoose.model('User', UserModel);