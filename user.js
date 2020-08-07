const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node')
const UserModel = new mongoose.Schema({
	email:{type:String, required:true, unique:true},
	password:{type:String, min:6}
})


UserModel.pre('save', function(callback){
	var user = this
	if (!user.isModified('password')) return callback();

	bcrypt.genSalt(5, function(err, salt){
		if (err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err,hash){
			if (err) return callback(err);
			user.password = hash;
			callback()
		});
	})

})
module.exports = mongoose.model('User', UserModel);