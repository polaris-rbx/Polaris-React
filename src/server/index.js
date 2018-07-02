const express = require('express');
const os = require('os');

const app = express();
const path = require("path");
const servers = {
	1: {
		ranksToRoles: true
	},
	2: {
		ranksToRoles: true
	}
};
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/servers/:id', function(req, res) {
	if (req.params.id) {
		if (servers[req.params.id]) {
			res.send(servers[req.params.id]);
		} else {
			res.status(404);
			res.send({error: "Not found!"});
		}
	} else {
		res.status(400);
		res.send({error: "Bad request!"});
	}

});

// Sends index.js for production.
app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});


app.listen(8080, () => console.log('Listening on port 8080!'));
