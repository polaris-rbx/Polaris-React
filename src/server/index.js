// Express
const express = require('express');
const app = express();

// Require statements
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require("fs");
const api = require('./api.js');

const filePath = path.resolve(__dirname, '..' , '..','dist', 'index.html');
const staticPath = path.resolve(__dirname, '..', '..', 'public');

const port = 80;
// Middleware use
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/public', express.static(staticPath));
// Pages
let fileExists;
// File exist check
fs.access(filePath, fs.constants.F_OK, (err) => {
	fileExists = !err;
});

// STATIC FILES
app.get('/', function (req, res) {
	console.log(`Request to index from ${req.ip}`);
	res.sendFile(path.join(staticPath, 'home.html'));
});

app.get('/commands', function (req, res) {
	console.log(`Request to command page from ${req.ip}`);

	res.sendFile(path.join(staticPath, 'commands.html'));
});

app.get('/terms', function (req, res) {
	console.log(`Request to Terms page from ${req.ip}`);
	res.sendFile(path.join(staticPath, 'terms.html'));
});

app.get('/panel', function (req, res) {
	console.log(`Request to web panel page from ${req.ip}`);
	if (fileExists) {
		res.sendFile(filePath);
	} else {
		res.status(404).send({error: {status: 404, message: "Page not found"}});
	}
});

app.get('/panel/*', function (req, res) {
	console.log(`Request to web panel page from ${req.ip}`);
	if (fileExists) {
		res.sendFile(filePath);
	} else {
		res.status(404).send({error: {status: 404, message: "Page not found"}});
	}
});
app.use(express.static('dist'));




// Custom error handler which deals with invalid json
app.use(function (error, req, res, next) {
	if (error instanceof SyntaxError) {
		res.status(400).send({error: {status: 400, message: "Invalid json"}});
	} else {
		next();
	}
});


// error handler.
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
	console.error('Error caught: ', err.stack);
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
app.listen(port, () => console.log('Listening on port ' + port));