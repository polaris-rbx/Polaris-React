// Require statements
const express = require('express');
// Routes
const roblox = require('./routes/roblox');
const servers = require('./routes/servers');
const discord = require('./routes/discord');

const rateLimit = require('./ratelimit.js');

const router = express.Router();
// Log & check ratelimit
router.use(rateLimit);

router.use('/discord', discord);
router.use('/roblox', roblox);
router.use('/servers', servers);


// General api

router.get('/alert', function (req, res) {
	res.send({
		type: 'info',
		message: 'Polaris panel <strong>ALPHA</strong>: Hello world.', // <a href="#" class="alert-link">an example link</a>
		active: false
	});
});


/* Valid types for above:
primary, secondary, success, danger, warning, info, light, dark
Anything added after a space will be interpreted as a class on the Alert element.
*/

// 404 page for API
router.use(function (req, res) {
	res.status(404);
	res.send({error: {message: 'Blank API page', status: 404}});
});
module.exports = router;
