var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-Parser');
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express() // run express whic comes from the requre express

function compile(str,path){
	return stylus(str).set('filename',path);
}


// config view engine
app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile:compile
	}
));
// set up static middleware
// this is static router handling.
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req,res){
	res.render('partials/'+ req.params.partialPath);
})

app.get('/',function(req, res){
	res.render('index');
});

// any other request will be handled to this route
// this will get serverd up to the client and we'll make the clients reponsablity to 
	// to deal with 404 errors.
// this is a bit dangious, get a route wrong and angular will fuck up

// can be better just to create your routes in sever and match them up in angular

var port = 3030;

app.listen(port);


console.log("listen on port " + port + "yeah") 