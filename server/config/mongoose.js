var mongoose = require('mongoose')



module.exports = function(config){
	// mongoose.connect('mongodb://localhost/ang{ularTestApp');
	// mongoose.connect('mongodb://george:password@dbh43.mongolab.com:27437/mean-stack-test');
	var db = mongoose.connection;
	// use variable to listen to mongo events on database
	// so when an error happens => log out connection error

	// this is the concept of catching events, we can use each one to fire anomalas function to do stuff
	db.on('error',function(){
		console.log("something wrong with database")
	})
	// more intersting way
	// db.on('error', console.error.bind(console,"something wrong"))
	db.once('open', function callback(){
		console.log("angualr test db open")
	})

	var userSchema = mongoose.Schema({
		firstName:String,
		lastName:String,
		userName:String
	})
	var User = mongoose.model("User",userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			User.create({firstName:'Joe',lastName:'Eames',userName:'joe'});
			User.create({firstName:'John',lastName:'papa',userName:'john'});
			User.create({firstName:'Dan',lastName:'Wahlin',userName:'dan'});
		}
	})
}