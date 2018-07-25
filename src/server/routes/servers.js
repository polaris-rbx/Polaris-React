// /servers/ route. Provides server settings, and user guild lists.
const express = require('express');
const router = express.Router();

const { catchAsync, getUserServers } = require('../util/discordHTTP');
const IPC = require('../util/ipcManager');
const config = require('../config.js');

const r = require('rethinkdbdash')();
// /servers
router.use(function(req, res, next) {
	if (!req.cookies.auth) {
		return res.status(403).send({error: {status: 403, message: "NotLoggedIn", redirect: '/api/discord/login'}});
	}
	next();
});

router.get('/', catchAsync(async function(req, res){
	const allowedServers = await getUserServers(req.cookies.auth);
	if (allowedServers.error) {
		res.status(allowedServers.error.status).send(allowedServers);
	} else {
		res.send(allowedServers);
	}
}));
// /servers/:id
router.get('/:id', catchAsync(async function(req, res) {
	// Check for auth
	if (req.params.id) {
		// Param validation
		if (!validNum(req.params.id)) {
			return res.status(400).send({error: {status: 400, message: 'Server id must be a number.'}});
		}

		const servers = await getUserServers(req.cookies.auth);
		if (servers.error) {
			res.status(servers.error.status).send(servers.error);
			return;
		}

		// Find target server
		let targetServer;
		for (let currentServer of servers) {
			if (currentServer.id === req.params.id) {
				targetServer = currentServer;
			}
		}
		if (!targetServer) {
			return res.status(403).send({error: {status: 403, message: 'User is not in target guild, or does not have permission'}});
		}

		if (!await IPC.isIn(req.params.id)) {
			res.send({error: {status: 400, message: "NotInServer", redirect: config.botInvite}});
			return;
		}
		// validate auth/ get user servers. This should be moved to the DB class in future?

		const record = await r.db('main').table('servers').get(req.params.id).run();
		if (record) {
			return res.send(record);
		} else {
			res.status(404);
			res.send({error: { message: "Server not found", status: 404}});
		}
	} else {
		res.status(400);
		res.send({error: { message: "Bad request!", status: 400}});
	}
}));

// EDIT SERVER SETTINGS
// Post as it's editing.
// /servers/:id
router.post('/:id', catchAsync(async function(req, res) {
	// Param validation
	if (!req.body || !req.body.newSetting) {
		return res.status(400).send({error: {status: 400, message: 'newSetting is required'}});
	}

	// Get all user's servers
	const servers = await getUserServers(req.cookies.auth);
	if (servers.error) {
		res.status(servers.error.status).send(servers.error);
		return;
	}

	// Find target server
	let targetServer;
	for (let currentServer of servers) {
		if (currentServer.id === req.params.id) {
			targetServer = currentServer;
		}
	}
	if (!targetServer) {
		return res.status(403).send({error: {status: 403, message: 'User is not in target guild, or does not have permission'}});
	}

	// Check if bot is in the server or not.
	if (!await IPC.isIn(req.params.id)) {
		res.send({error: {status: 400, message: "NotInServer", redirect: config.botInvite}});
		return;
	}
	// Extract the wanted settings from their provided object. Validate too. newObj will be current settings?
	let newObj = {};
	let oldObj = req.body.newSetting;
	let errors = [];
	// Validate mainGroup obj
	if (oldObj.mainGroup) {
		if (!newObj.mainGroup) newObj.mainGroup = {};
		// Validate mainGroup id
		if (oldObj.mainGroup.id) {
			if (validNum(oldObj.mainGroup.id)) {
				newObj.mainGroup.id = parseInt(oldObj.mainGroup.id, 10);
			} else {
				// Id is not valid
				errors.push({valueName: 'mainGroup.id', value: oldObj.mainGroup.id, message: 'mainGroup.id must be a number'});
			}
		}

		// Validate mainGroup ranksToRoles
		if (oldObj.mainGroup.ranksToRoles) {
			if (validBool(oldObj.mainGroup.ranksToRoles)) {
				newObj.mainGroup.ranksToRoles = oldObj.mainGroup.ranksToRoles;
			} else {
				errors.push({valueName: 'mainGroup.ranksToRoles', value: oldObj.mainGroup.ranksToRoles, message: 'mainGroup.ranksToRoles must be a boolean'});
			}
		}

		// Validate mainGroup binds (NEW)
		// Will be replacing old binds; binds will be part of sub-groups
		// Binds: array of {role: "312312313", rank: number, exclusive: bool}
	}

	res.status(200).send({status: 200, message: "ok!", server: targetServer});

}));

// GET SERVER SETTINGS
router.get('/:id/roles', catchAsync(async function(req, res) {
	// Check for auth
	if (req.params.id) {
		const resp = await IPC.getRoles(req.params.id);
		if (resp.error) {
			res.status(res.error.status).send(resp);
			return;
		}
		res.send(resp);
	}
}));



const validNum  = (num)  => !isNaN(parseInt(num, 10));
const validBool = (bool) => typeof(bool) === "boolean";




module.exports = router;
