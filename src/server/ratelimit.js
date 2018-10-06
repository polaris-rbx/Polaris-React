const rateLimit = new Map();
const fetch = require('node-fetch');
const webhookUrl = "https://ptb.discordapp.com/api/webhooks/498199453774381067/O2Na0c42n9g5_w9xmrgecKijWQPdKeNYI0ljKe1mi3ZnmsoA2eD6jhIbEgcN9-aSr4Os";

/**
 * maxReqs - Max requests per time
 * hugeReq - Send alert if value is greater than this
 * time - Time, in seconds, for maxReq to apply
 */
const maxReqs = 15;
const hugeReq = 60;
const time = 60; // seconds
let lastSent;

module.exports = function (req, res, next) {
	if (checkUser(req.ip)) {
		log(`API Request received from ${req.ip}.`);
		next();
	} else {
		log(`Rejected API request from ${req.ip}.`);
		res.status(429).send({
			error: {
				status: 429,
				message: "Too many requests. Take a chill pill.",
				retryAfter: time,
			}
		});
	}
};
// returns false for too many requests, true for OK.
function checkUser (ip) {
	const userLimit = rateLimit.get(ip);
	if (userLimit) {
		// If user is over the limit, check the time
		if (userLimit.requests >= maxReqs) {
			if (userLimit.set < Date.now() - (time / 1000)) {
				// Invalid!
				if (userLimit.requests > hugeReq) {
					sendAlert(ip, userLimit);
				}
				userLimit.requests += 1;
				rateLimit.set(ip, userLimit);
				return false;
			} else {
				// it's fine due to time
				rateLimit.set(ip, {
					set: Date.now(),
					requests: 1
				});
			}
		} else {
			//they're ok
			userLimit.requests += 1;
			rateLimit.set(ip, userLimit);
			return true;
		}
	} else {
		// they havent sent before
		rateLimit.set(ip, {
			set: Date.now(),
			requests: 1
		});
		return true;
	}
}



function sendAlert(ip, userObj) {
	const now = Date.now();
	// Only allow each ip to send an alert per 15 sec
	const alreadySent = userObj.lastAlert ? now - userObj.lastAlert < 15000 : false;
	// if more than 5 secs have passed since last send globally
	if ((!lastSent || now - lastSent > 5000) && !alreadySent) {
		const sendData = {
			content: "@everyone ALERT: Possible attack in progress",
			embeds: [
				{
					title: `Possible DDOS detected. Excessive requests.`,
					description: `**IP Address**: \`${ip}\`\n**No. Requests**: \`${userObj.requests}\`\n**Time since first request**: \`${(Date.now() - userObj.set) / 1000}\` seconds\n\n**DO NOT IGNORE THIS ALERT.**`,
					color: 11730954
				}
			],
			tts: true
		};
		fetch(webhookUrl, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sendData), // body data type must match "Content-Type" header
		});
		lastSent = Date.now();
		userObj.lastAlert = Date.now();
		rateLimit.set(ip, userObj);
		log(`Sent alert for ${ip}`);
	} else {
		log(`Not sending alert: too soon. ${ip} - ${userObj.requests}`);
	}
}
const log = (...args)=> {
	const date = new Date();
	console.log(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}: `, ...args);
};