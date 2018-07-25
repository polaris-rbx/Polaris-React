// /discord/ route - Provides login
const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const btoa = require('btoa');


const {getUserInfo, catchAsync} = require('../util/discordHTTP');


// Globals
const config = require('../config.js');
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;

const redirect = encodeURIComponent('http://localhost:8081/api/discord/callback');


router.get('/login', (req, res) => {
	res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`);
});

// Get code etc. from discord.
router.get('/callback',catchAsync (async (req, res) => {

	if (!req.query.code) {
		if (req.query.error) {
			if (req.query.error === "access_denied") return res.redirect('http://localhost:3000/?status=denied');
		}
		return res.status(400).send({error: {status: 400, message: "NoCodeProvided"}});
	}
	const code = req.query.code;
	const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
	const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${creds}`,
			},
		});
	const json = await response.json();
	res.cookie('auth', json.access_token);
	res.redirect('http://localhost:3000/panel');


}));
// Here so that the login check doesn't happen to the login routes.
router.use('/', function (req, res, next) {
	if (!req.cookies.auth) {
		return res.status(401).send({error: {status: 401, message: 'NotLoggedIn'}});
	} else {
		next();
	}
});

router.get('/@me', catchAsync(async function (req, res) {
	const resp = await getUserInfo(req.cookies.auth);
	if (resp.error) {
		res.status(resp.error.status).send(resp);
	} else {
		res.send(resp);
	}
}));





module.exports = router;
