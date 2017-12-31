var fs = require('fs') //include filesystem
var board = require('./board'); //include board module

//Reads instruction file in from command line and checks for valid board dimensions.
var text = fs.readFileSync(process.argv[2], 'utf-8');
var inputs = text.split('\n');
var board_dimension = inputs[0].split(' ');
//Check board dimensions.
if (board.checkBoard(board_dimension) === false) {
	console.log('Board dimensions too small.')
	console.log('Test #'+process.argv[2].slice(4,5), 'No Answer\n')
	return;
};

//Parse instructions from text file to initialize position, movements, and wall locations.
var initial_position = inputs[1].split(' ').map(function(val) { //Convert coordinates to integers for later addition.
	return parseInt(val);
});
var movements = inputs[2].split('')
var coins = 0;
var walls = []

for (var i = 3; i < inputs.length; i++) {
	if (inputs[i] !== '') {
		walls.push(inputs[i].trim());
	}
}

//Build the board.
var game = board.create(board_dimension[0], board_dimension[1], walls, initial_position)
if (game) { //Simulate the game.
	var play = board.play(movements, coins, initial_position, game);
	if (play) {
		console.log('Test #'+process.argv[2].slice(4,5), 'Answer: \n', 'Final coordinates: ', play[1][0], ' ', play[1][1], '\n', 'Coins: ', play[0]+'\n');
	}
	else {
		console.log('Test #'+process.argv[2].slice(4,5), 'No Answer\n');
	}
}
else {
	console.log('Test #'+process.argv[2].slice(4,5), 'No Answer\n')
	return;
}
