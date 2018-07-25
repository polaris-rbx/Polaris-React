

const Database = {
	_r: require('rethinkdbdash')(),
	botDb: Database._r.db('main'),
	webDb: Database._r.db('web'),
	authTable: Database.webDb.table('auth')
};
Database.createUser = async function (discordId, discordToken) {
	const res = await Database.authTable.insert({
		id: discordId,
		token: discordToken
	});
};
module.exports = Database;
