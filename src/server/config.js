/**
 * COPYRIGHT JOSH MUIR 2018
 * UNAUTHORISED ACCESS TO THIS FILE CONSTITUTES AN OFFENSE.
 * YOU WILL BE BLACKLISTED FROM THE SERVICE AND LEGAL ACTION MAY BE TAKEN.
 * Queries - files@muir.xyz
 */


if (process.env.NODE_ENV === "production") {
	// Production values
	module.exports = {
		port: 80,
		'secret': 'ClGg3IlypZ38fDCAMgTeBscrFtKCLqnCuK9uHvQyIa0lkRf6mdBFZhZAceBeYCiXykSqhMYQzUv0BGXiXGKYj9QjM5krIs5bNyCBXWnKoiRWGHt', // i dont think i even use this
		CLIENT_ID: '375408313724043278',
		CLIENT_SECRET: '2pZhMPtJeiVZ27X3v8zuodonkuOyyszI',
		botInvite: "https://discordapp.com/oauth2/authorize?client_id=375408313724043278&scope=bot&permissions=470281408",
		baseurl: "https://polaris-bot.xyz",
		allowedUsers: [
			"179256560139108352", //Eirik,
			"183601072344924160", //me
			"175948533948612608", // Jack - 1
			"269783091583647754", // abcde - 2
			"284060998191677460", // in the gutters - 3
			"119664729068273664", // jebediah
			"229515374708654080", //diamond
			"211122613429338112" // martin
		]
	};
} else {
	// dev values - test bot
	module.exports = {
		port: 81,
		'secret': 'ClGg3IlypZ38fDCAMgTeBscrFtKCLqnCuK9uHvQyIa0lkRf6mdBFZhZAceBeYCiXykSqhMYQzUv0BGXiXGKYj9QjM5krIs5bNyCBXWnKoiRWGHt', // i dont think i even use this
		CLIENT_ID: '314776952546525186',
		CLIENT_SECRET: 'GniGJ6CJm97OM66XRr8hE_h--_-tkshO',
		botInvite: "https://discordapp.com/oauth2/authorize?client_id=314776952546525186&scope=bot&permissions=470281408", //test bot
		baseurl: "http://localhost",
		panelPort: 3000,
		allowedUsers: [
			"179256560139108352", //Eirik,
			"183601072344924160", //me
			"175948533948612608", // Jack - 1
			"269783091583647754", // abcde - 2
			"284060998191677460", // in the gutters - 3
			"119664729068273664", // jebediah
			"229515374708654080", //diamond
			"211122613429338112" // martin
		]
	};
	console.log(`In dev mode.`);
}

