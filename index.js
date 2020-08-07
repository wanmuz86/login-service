const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./User')
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.agh0w.mongodb.net/rest-api?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();

router.get('/', (req,res)=>{
	res.json({message:'hooray! welcome to my API'});
})

router.post('/register', (req,res)=>{
	const newUser = new User();
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.save((err)=>{
		if (err) res.json({error:'message '+err});
		res.json({message:"User succesfully registered"});
	})

})

router.post('/login', (req,res)=>{
	User.findOne({email:req.body.email}, (err,user)=>{
		if (err) res.json({message:'error '+err});
		if (user){
			if (user.password === req.body.password){
				res.json({message:'OK. Authenticated'})
			}
			else {
				res.json({message:'Wrong password'})
			}
		}
		else {
			res.json({message:'User not found'})
		}
	})
})
app.use('/api',router);

app.listen(port);
console.log('Magic happens on port '+port);