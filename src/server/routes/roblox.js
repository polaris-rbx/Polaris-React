const express = require('express');

const fetch = require('node-fetch');
const { catchAsync } = require('../util/discordHTTP');
const rateLimit = require('../ratelimit');

const router = express.Router();
router.use(rateLimit);

const cache = new Map();
setInterval(function(){
	cache.clear();
	console.log(`Cleared Roblox cache`);
}, 1800000);
router.get(`/group/:id`, catchAsync(async function (req, res) {
	if (req.params.id) {
		//if (cache.get(req.params.id)) {
		//	const group = cache.get(req.params.id);
		//	group.cached = true;
		//	res.send(group);
		//	return;
		//}
		if (isNaN(req.params.id)) {
			res.status(400);
			return res.send({error: {status: 400, message: 'Group Id must be a valid number.'}});
		}
		let apiRes = await fetch(`https://groups.roblox.com/v1/groups/${req.params.id}`);
		if (apiRes.status === 404) {
			res.status(404);
			return res.send({error: {status: 404, message: 'Group does not exist'}});
		} else if (apiRes.status === 503) {
			res.status(503);
			return res.send({error: {status: 503, message: 'Get group info is disabled'}});
		} else if (!apiRes.ok) {
			res.status(apiRes.status);
			const apiResJson = await apiRes.json();
			const message = apiResJson.message ? apiResJson.message : apiResJson[0].message;
			return res.send({error: {status: apiRes.status, message: message}});
		}
		apiRes = await apiRes.json();
		let roles = getRoles(req.params.id)
		if(typeof roles === 'string' || roles instanceof String){
			res.status(503);
			return res.send({error: {status: 503, message: 'Roles api failed! - ' + roles}});
		}
		apiRes["roles"] = roles["roles"]
		cache.set(req.params.id, apiRes);
		return res.send(apiRes);

	} else {
		res.status(400);
		return res.send({error: {status: 400, message: 'Group Id is required.'}});
	}

}));

async function getRoles(groupid){
	if (groupid) {
		//if (cache.get(req.params.id)) {
		//	const group = cache.get(req.params.id);
		//	group.cached = true;
		//	res.send(group);
		//	return;
		//}
		let apiRes = await fetch(`https://groups.roblox.com/v1/groups/${groupid}/roles`);
		if (apiRes.status === 404) {
			return "Error - no group"
		} else if (apiRes.status === 503) {
			return "Error - api is disabled?"
		} else if (!apiRes.ok) {
			return "Error - unknown error"
		}
		apiRes = await apiRes.json();
		//cache.set(groupid, apiRes);
		//return res.send(apiRes);
		return apiRes
	} else {
		return "Error - id doesnt exist"
	}
}

router.get(`/group/icon/:id`, catchAsync(async function (req, res) {
	if (req.params.id) {
		//if (cache.get(req.params.id)) {
		//	const group = cache.get(req.params.id);
		//	group.cached = true;
		//	res.send(group);
		//	return;
		//}
		if (isNaN(req.params.id)) {
			res.status(400);
			return res.send({error: {status: 400, message: 'Group Id must be a valid number.'}});
		}
		let apiRes = await fetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${req.params.id}&size=420x420&format=Png&isCircular=false`);
		if (apiRes.status === 404) {
			res.status(404);
			return res.send({error: {status: 404, message: 'Group does not exist'}});
		} else if (apiRes.status === 503) {
			res.status(503);
			return res.send({error: {status: 503, message: 'Get group info is disabled'}});
		} else if (!apiRes.ok) {
			res.status(apiRes.status);
			const apiResJson = await apiRes.json();
			const message = apiResJson.message ? apiResJson.message : apiResJson[0].message;
			return res.send({error: {status: apiRes.status, message: message}});
		}
		apiRes = await apiRes.json();
		cache.set(req.params.id, apiRes);
		return res.send(apiRes);

	} else {
		res.status(400);
		return res.send({error: {status: 400, message: 'Group Id is required.'}});
	}

}));

module.exports = router;
