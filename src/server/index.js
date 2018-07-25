// Express
const express = require('express');
const app = express();

// Require statements
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require("fs");
const api = require('./api.js');

// Middleware use
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));
app.use('/api', api);

// Index.html presence check. Sends 404 json if it does not exist. If it does, sends it for blank pages.
var fileExists;
const filePath = path.resolve(__dirname, '../../dist', 'index.html');
fs.access(filePath, fs.constants.F_OK, (err) => {
	fileExists = err ? false : true;
});

// Sends index.html for production.
app.use(function(request,res) {
	if (fileExists) {
		res.sendFile(filePath);
	} else {
		res.status(404).send({error: {status: 404, message: "Page not found"}});
	}
});



app.listen(8081, () => console.log('Listening on port 8081!'));

// error handler.
app.use(function (err, req, res, next) { //eslint-disable-line
	console.error('Error caught: ', err.stack);	 // Eslint disabled as next is never used.
	res.status(500).send({error: {status: 500, message: err.message}});
});

// Error catchers. Shouldn't be used.
process.on('uncaughtException', function(err) {
	console.log( " UNCAUGHT EXCEPTION " );
	console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});
process.on('unhandledRejection', function(err) {
	console.log( " UNCAUGHT REJECTION " );
	console.log( "[Inside 'uncaughtRejection' event] " + err.stack || err.message );
});
