const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node')
const UserModel = new mongoose.Schema({
	email:{type:String, required:true, unique:true},
	password:{type:String, min:6}
})

// ES6 Topic
UserModel.pre('save', (callback)=>{
	var user = this
	if (!user.isModified('password')) 
		{
			return callback();
		}

	bcrypt.genSalt(5, (err, salt) => {
		if (err) return callback(err);

		bcrypt.hash(user.password, salt, null, (err,hash)=> {
			if (err) return callback(err);
			user.password = hash;
			callback()
		});
	})

})


UserModel.methods.verifyPassword = function(password, callback){
	// it will check if the hash of "password" is the same with the one in db 
	bcrypt.compare(password, this.password, function(err,isMatch){
		if (err) callback(err)
		callback(null, isMatch);
	})
}

module.exports = mongoose.model('User', UserModel);