// /discord/ route - Provides login
const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const btoa = require('btoa');

const {getUserInfo, catchAsync} = require('../util/discordHTTP');
const rateLimit = require("../ratelimit");
const { URLSearchParams } = require("url");


// Globals
const config = require('../config.js');
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
// Now locked on 80 for the time being
const redirect = `${config.baseurl}/api/discord/callback`;
const scope = "identify guilds";

router.get('/login', (req, res) => {
	res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&response_type=code&redirect_uri=${redirect}`);
});

// Get code etc. from discord.
router.get('/callback',catchAsync (async (req, res) => {

	if (!req.query.code) {
		if (req.query.error) {
			if (req.query.error === "access_denied") return res.redirect('https://polaris-bot.xyz/?status=denied');
		}
		return res.status(400).send({error: {status: 400, message: "NoCodeProvided"}});
	}
	const code = req.query.code;
	const body = {
		"grant_type": "authorization_code",
		"code": code,
		"redirect_uri": redirect,
		"client_id": CLIENT_ID,
		"client_secret": CLIENT_SECRET,
		"scope": scope
	}
	const response = await fetch(`https://discord.com/api/oauth2/token`,
		{
			method: 'POST',
			body: new URLSearchParams(body)
		});
	if (!response.ok) {
		let contents = await response.json();
		if (contents.error === "invalid_grant") {
			return res.status(401).send({error: {status: 401, message: "Invalid Oauth2 code."}});
		}
		res.status(response.status).send({error: {message: contents.error, status: response.status, forHuman: `If you're reading this, discord either discord is down or Polaris is currently experiencing a serious error. Please report this to me.`}});
		// Add sentry?
		return console.error(`WARNING. Login error! `, contents);
	}
	const json = await response.json();

	res.cookie('auth', json.access_token);
	if (process.env.NODE_ENV === "production") {
		res.redirect(`${config.baseurl}/panel`);
	} else {
		console.log(`Redirecting to panel`);
		res.redirect(`http://localhost:${config.panelPort}/panel`);
	}

	// temp

}));

router.use(rateLimit);

router.get('/@me', catchAsync(async function (req, res) {
	const resp = await getUserInfo(req.headers.authorization);
	if (resp.error) {
		res.status(resp.error.status).send(resp);
	} else {
		res.send(resp);
	}
}));





module.exports = router;
