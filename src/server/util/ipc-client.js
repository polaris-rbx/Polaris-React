/*
	IPC-client.js
	This file is the client for IPC. It connects to the local IPC
	It represents what Polaris bot would do.
	This is a temp file for testing and getting things working. When everything else is done, it'll be integrated into the bot.
*/



const IPC = require('node-ipc');

IPC.config.id = 'polarisClient';
IPC.config.retry = 1500;
IPC.config.silent = true;

IPC.connectTo('polarisServer', function() {
	const ws = IPC.of.polarisServer;
	ws.on('connect', function() {
		console.log('IPC: Connected!');
	});
	ws.on('disconnect', function() {
		console.log(`IPC: Disconnected! Attempting re-connection.`);
	});

	ws.on('error', function(error){
		if (error.code === 'ENOENT') {
			console.log(`IPC: Server has disconnected. Error caught.`);
		} else {
			throw new Error(error);
		}
	});

	ws.on('botCheck', function(msg) {
		msg = JSON.parse(msg);

		// Will need to actually add in bot support in future.
		var validServers = {
			"375406825794699264": true,
			1: true,
		};
		if (validServers[msg.data.guildId]) {
			sendObject(ws, 'botCheckRes', {data: true, _id: msg._id});
		} else {
			sendObject(ws, "botCheckRes", {data: false, _id: msg._id});
		}
	});

	ws.on('getRoles', function(msg) {
		msg = JSON.parse(msg);

		// Will need to actually add in bot support in future. Roles are in Collections. Use for of collection.values() and remove useless values.
		const serverRoles = [
			{
				id: '376755089982881802',
				name: 'Developer',
				color: 1146986,
			},
			{
				id: '392071324601942017',
				name: 'Beta tester',
				color: 15844367,
			},
			{
				id: '393891655750516737',
				name: 'Management Officer',
				color: 1752220,
			},
			{ 
				id: '397434305929805825',
				name: 'VIP',
				color: 10038562
			},
			{
				id: '398424041104343050',
				name: 'Muted',
				color: 8487814
			}
		];
		// lol meme doesnt actually use guild id at all im so savage!
		sendObject(ws, 'getRolesRes', {data: serverRoles, _id: msg._id});

	});
});
const sendObject = (ws, type, object) => ws.emit(type, JSON.stringify(object));
