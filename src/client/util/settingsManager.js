const { apiFetch }   = require('./apiFetch.js');

var newSettings = {};

// i dont even think this can be populated with > 1 but whatever
const settingsStorage = {};

// Connects to the popup. This could 100% be done better.
var onEditFunc;
function setEditFunc(func){
	onEditFunc = func;
}

function change () {
	if (onEditFunc) {
		onEditFunc(true);
	}
}

// hmph! are you having a nice look through my source??
async function save () {
	let res = await apiFetch(`/api/servers/${window._discordServerId}`, {
		method: "post",
		body: JSON.stringify({
			newSetting: newSettings
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	if (res.error) {
		throw new Error(res.error.message);
	}
	if (res.newSettings) {
		settingsStorage[window._discordServerId] = res.newSettings;
	} else {
		console.error(res);
	}
	console.log(`Settings updated.`);

	newSettings = {};
	onEditFunc(false);
}


async function getSettings (id) {
	if (id && !window._discordServerId) window._discordServerId = id;
	id = id ? id : window._discordServerId;

	if (settingsStorage[id]) {

		return settingsStorage[id];
	}
	const res = await apiFetch(`/api/servers/${id}`);

	if (res.error) {
		if (res.error.redirect) {

			if (res.error.redirect.newTab) {
				//window.open(res.error.redirect.url, '_blank');
				window.location.href = res.error.redirect.url;
			} else {
				window.location.href = res.error.redirect.url;
			}
			return;
		} else {

			return res;
		}
	}
	// Type fixes. Should be fixed in the db too.
	if (res.mainGroup) {
		if (typeof res.mainGroup.ranksToRoles !== "boolean" && res.mainGroup.ranksToRoles !== undefined) {
			res.mainGroup.ranksToRoles = res.mainGroup.ranksToRoles === "true" ? true : false;
		}
		if (typeof res.mainGroup.id !== "number" && res.mainGroup.id !== undefined) {
			res.mainGroup.id = parseInt(res.mainGroup.id, 10);
		}
	}
	if (!res.subGroups) {
		res.subGroups = [];
	}
	settingsStorage[window._discordServerId] = res;
	return res;
}

module.exports.getSubGroup = async function (groupId) {
	const res = await getSettings ();
	if (res.error) return res;
	if (res.subGroups) {
		if (res.subGroups.length !== 0) {
			for (let current of res.subGroups) {
				if (current.id === groupId) return current;
			}
		} else return;
	}
};


function changeAutoVerify(newVal) {
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.autoVerify !== newVal) {
			change();
			newSettings.autoVerify = newVal;
		}
	}
}

function changePrefix(newVal) {
	if (!newVal || newVal === "") newVal = ".";
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.prefix !== newVal) {
			change();
			newSettings.prefix = newVal;
			return true;
		}
	}
}


function editMainGroup(newVal) {
	let current = settingsStorage[window._discordServerId];
	if (current) {

		if (!current.mainGroup && !newSettings.mainGroup) current.mainGroup = {};
		if (!newSettings.mainGroup)	newSettings.mainGroup = {};

		if (newVal.id) {
			if (current.mainGroup.id !== newVal.id) newSettings.mainGroup.id = newVal.id; change();
		}
		if (newVal.ranksToRoles !== undefined) {
			if (newVal.ranksToRoles !== current.mainGroup.ranksToRoles) newSettings.mainGroup.ranksToRoles = newVal.ranksToRoles; change();
		}
		if (newVal.binds) {
			newSettings.mainGroup.binds = newVal.binds;
			change();
		}
	}
}

// Subgroup
function editGroup(id, newVal) {
	let current = settingsStorage[window._discordServerId];
	if (!newSettings.subGroups) newSettings.subGroups = current.subGroups || [];
	if (current) {
		let pos;
		for (let count = 0; count <  current.subGroups.length; count++) {
			if (parseInt(current.subGroups[count].id, 10) === parseInt(id, 10)) {
				pos = count;
			}
		}
		const target = pos !== undefined ? current.subGroups[pos]: {};
		if (id) target.id = parseInt(id);
		if (newVal.ranksToRoles !== undefined) target.ranksToRoles = newVal.ranksToRoles;

		if (newVal.binds) {
			if (target.binds) {
				// add together
				target.binds = target.binds.concat(newVal.binds);
			} else {
				target.binds = newVal.binds;
			}

		}

		if (pos !== undefined) {
			// found. set it
			newSettings.subGroups = current.subGroups;
			newSettings.subGroups[pos] = target;
			change();

		} else if (current.mainGroup &&current.mainGroup.id === id) {
			// It's the maingroup
			editMainGroup(newVal);
		} else {
			console.log(`Adding subgroup ${target.id}`);
			newSettings.subGroups.push(target);
			change();
		}

	}
}
function setMainGroup (newId) {
	if (!newId) throw new Error('No id for set main group');
	// Find sub group with that id
	const current = settingsStorage[window._discordServerId];
	if (current) {
		let pos = 0;
		if (current.subGroups) {
			for (let count = 0; count < current.subGroups.length; count++) {
				const group = current.subGroups[count];
				if (group.id == newId) {
					pos = count;
				}
			}
			const newMain = current.subGroups.splice(pos, 1)[0];
			// Push current mainGroup to subgroups
			if (current.mainGroup && current.mainGroup.id) {
				current.subGroups.push(current.mainGroup);
			}
			// Set new main group
			newSettings.mainGroup = newMain;
			newSettings.subGroups = current.subGroups;
			change();
			return true;
		}
	}
}
function deleteGroup(groupId) {
	const current = settingsStorage[window._discordServerId];
	if (current) {
		// Check if its the main group
		if (current.mainGroup && current.mainGroup.id == groupId) {
			// delete it and set subGroups[0] as main
			if (current.subGroups.length !== 0) {

				const newMain = current.subGroups.splice(0, 1)[0];
				newSettings.subGroups = current.subGroups;
				newSettings.mainGroup = newMain;

			} else {
				newSettings.mainGroup = {};
			}
			change();
		} else {
			let groupPos;
			// Its not main group. Find it in sub groups and splice it.
			for (var count = 0; count < current.subGroups.length; count++) {

				if (current.subGroups[count].id == groupId) {
					groupPos = count;
				}
			}
			if (groupPos !== undefined) {
				current.subGroups.splice(groupPos, 1);
				newSettings.subGroups = current.subGroups;
				change();
			}
		}


	}

}


async function send (id) {
	let res = await apiFetch(`/servers/${id}/`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json;",
		},
	});
	if (!res.ok) {
		return {error: {status: res.status, message: await res.json().error.message}};
	}
	res = await res.json();
	if (res.success) return true;
}
export {
	send,
	changeAutoVerify,
	getSettings,
	changePrefix,
	editMainGroup,
	editGroup,
	setMainGroup,
	deleteGroup,
	setEditFunc as editEvent,
	save
};
