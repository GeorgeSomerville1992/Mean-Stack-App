var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-Parser');
	mongoose = require('mongoose')
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

if(env === 'development'){
	mongoose.connect('mongodb://localhost/angularTestApp');
}else{
	mongoose.connect('mongodb://george:password@dbh43.mongolab.com:27437/mean-stack-test');
}


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
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('message', messageSchema);
//create model basedon above schemea 
var mongoMessage;
// create variable to hold data 

Message.findOne().exec(function(err,messageDoc){
	mongoMessage = messageDoc.message;
});
// perform single docucment
app.get('/partials/:partialPath', function(req,res){
	res.render('partials/'+ req.params.partialPath);
})

app.get('*',function(req, res){
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

// any other request will be handled to this route
// this will get serverd up to the client and we'll make the clients reponsablity to 
	// to deal with 404 errors.
// this is a bit dangious, get a route wrong and angular will fuck up

// can be better just to create your routes in sever and match them up in angular

var port = process.env.PORT || 3030;

app.listen(port);


console.log("listen on port " + port + "yeah") 