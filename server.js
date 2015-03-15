var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport')
	localStrategy = require('passport-local').Strategy;
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express() // run express whic comes from the requre express

var config = require('./server/config/config')[env]



require('./server/config/express')(app,config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new localStrategy(
	function(username,password,done){
		User.findOne({username:username}).exec(function(err,user){
			// looks up user via username
			return user ? done(null,user):done(null,false)
			// if(user){
			// 	return done(null,user);

			// }else{
			// 	return done(null,false)
			// }
		})

	}
))

passport.serializeUser(function(user,done){

	if(user){
		done(null,user._id)
	}

});

passport.deserializeUser(function(id,done){
	User.findOne({_id:id}).exec(function(err,user){
		return user ? done(null,user):done(null,false)
		// if(user){
		// 	return done(null,user);

		// }else{
		// 	return done(null,false)
		// }
	})
})
require('./server/config/routes')(app);

mongoose.connect(config.db);





// any other request will be handled to this route
// this will get serverd up to the client and we'll make the clients reponsablity to 
	// to deal with 404 errors.
// this is a bit dangious, get a route wrong and angular will fuck up

// can be better just to create your routes in sever and match them up in angular


app.listen(config.port);

console.log("listen on port " + config.port + "yeah") 