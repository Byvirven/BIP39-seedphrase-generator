//// To modify ////////////
const limit = 12; // how many valid seeds we want
const skip = 0; // how many valid seeds we want to skip before to show valid seeds
const words = ["love", "music", "february", "life", "dream", "cat", "eagle", "home", "diamond", "hand", "you", "tell"]; // 12 seed words === maximum !12 === maximum 479'001'600 possibilities

//// To not modify /////////////////

const bip39 = require('bip39');

var valid = 0;
var skipped = 0;

function swap (alphabets, index1, index2) {
	var temp = alphabets[index1];
	alphabets[index1] = alphabets[index2];
	alphabets[index2] = temp;
	return alphabets;
}

function permute (alphabets, startIndex, endIndex) {
	if (startIndex === endIndex) {
		if (bip39.validateMnemonic(alphabets.join(' '))) {
			if (skipped === skip) {
				console.log ("valid seed : " + alphabets.join(' ') ); 
				valid++;
			} else {
				skipped++;
			}
		}
	} else {
		var i;
		for (i = startIndex; i <= endIndex && valid < limit; i++) {
			swap(alphabets, startIndex, i);
			permute(alphabets, startIndex + 1, endIndex);
			swap(alphabets, i, startIndex); // backtrack
		}
	}
}

permute(words, 0, words.length-1);
