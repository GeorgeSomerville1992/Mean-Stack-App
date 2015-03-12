var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express() // run express whic comes from the requre express

// config view engine
app.set('views', __dirname + '/server/views');
app.set('view engine','jade');


app.get('*',function(req, res){
	res.render('index');
}) 
// any other request will be handled to this route
// this will get serverd up to the client and we'll make the clients reponsablity to 
	// to deal with 404 errors.
// this is a bit dangious, get a route wrong and angular will fuck up

// can be better just to create your routes in sever and match them up in angular

var port = 3030;

app.listen(port);


console.log("listen on port " + port + "yeah") 