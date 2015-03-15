var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')



module.exports = {
	development:{
		db: 'mongodb://localhost/angularTestApp',
		rootPath:rootPath,
		port: process.env.PORT || 3030
	},

	production:{
		rootPath:rootPath,
		db: 'mongodb://george:password@dbh43.mongolab.com:27437/mean-stack-test',
		port: process.env.PORT || 80
	}

}