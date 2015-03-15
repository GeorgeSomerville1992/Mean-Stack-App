
module.exports = function(app) {
	// perform single docucment
	app.get('/partials/*', function(req,res){
		res.render('../../public/app/' + req.params[0]);
			// PREVENT LOOP CRASH go back to this!
	})

	app.post('/login',function(req,res,next){
		var auth = passport.authenticate('local',function(err,user){
			// checks if error has not sprung
			// checks if user exists
			if(err) {return next(err);}
			// if user does not exist, send JSON object we failed to authenticate
			if(!user) {res.send({})}
			// but if souccess full then do the following... 

			req.logIn(user,function(err){
				if(err){return next(err);}
				res.send({success:true,user:user})

			})
		})
		auth(req,res,next);
	})

	app.get('*',function(req, res){
		res.render('index');
	});
}