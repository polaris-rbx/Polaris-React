const validNumString = function (numString) {
	// For validating discord role ids as much as possible.
const validNums = {
		"0": true,
		"1":true,
		"2": true,
		"3": true,
		"4": true,
		"5": true,
		"6": true,
		"7": true,
		"8": true,
		"9": true,
	};

	let arr = numString.split('');
	for (let current of arr) {
		if (!validNums[current]) {
			return false;
		}
	}
	return true;

};
const startTime = new Date().getTime();
console.log(validNumString("0123456789078457820347037412313"));
const endTime = new Date().getTime();
console.log(`Time taken: ${endTime - startTime}ms`);
