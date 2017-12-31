//Create 2d array for board, 1 means coin available, -1 means it's a wall.
module.exports.create = function (X, Y, walls, start) {
	var board = []
	for (var i = 0; i < X; i++) {
		board[i] = [];

		for (var j = 0; j < Y ; j++) {
			var current_coordinate = i.toString() + ' ' + j.toString();
			if (walls.includes(current_coordinate)) { //Logic for position in 2d array to be wall or coin.
				if ((start[0] === i) && (start[1] === j)) {
					console.log('Starting point on wall.');
					return;
				}
				board[i][j] = -1;
			}
			else {
				board[i][j] = 1;
			}
		}
	}
	return board;
};

//Check that board dimensions are valid.
module.exports.checkBoard = function (board_dimension) {
	if ((board_dimension[0] < 1) && (board_dimension[1] < 1)) {
			return false;
	}
	return true;
}

//Play the game, check for each move to be valid before executing.
module.exports.play = function (moves, coins, current_position, current_board) {
	if (!checkCoords(current_position, current_board)) {
		console.log('Start point outside of board. ', current_position[0], ' ', current_position[1]);
		return false;
	};

	for (var i = 0; i < moves.length; i++) {

		if (moves[i] === 'E') {
			var X = current_position[0]+1
			var Y = current_position[1]
			if (isValid(X, Y, current_board)) {
				if (current_board[X][Y] === 1) {
					coins += 1;
					current_board[X][Y] = 0;
				}
				current_position = [X,Y]
			}
		}
		else if (moves[i] === 'S') {
			var X = current_position[0]
			var Y = current_position[1]-1
			if (isValid(X, Y, current_board)) {
				if (current_board[X][Y] === 1) {
					coins += 1;
					current_board[X][Y] = 0;
				}
				current_position = [X,Y]
			}
		}
		else if (moves[i] === 'N') {
			var X = current_position[0]
			var Y = current_position[1]+1
			if (isValid(X, Y, current_board)) {
				if (current_board[X][Y] === 1) {
					coins += 1;
					current_board[X][Y] = 0;
				}
				current_position = [X,Y];
			}
		}
		else if (moves[i] === 'W') {
			var X = current_position[0]-1
			var Y = current_position[1]
			if (isValid(X, Y, current_board)) {
				if (current_board[X][Y] === 1) {
					coins += 1;
					current_board[X][Y] = 0;
				}
				current_position = [X,Y];
			}
		}
	}
	return([coins, current_position]);
};

function checkCoords(coordinates, board) {
	if ((coordinates[0] >= board.length) || (coordinates[1] >= board[0].length)) {
		return false;
	}
	else if ((coordinates[0] < 0) || (coordinates[1] < 0)) {
		return false;
	}
	return true;
}

//Check if next move is valid.
function isValid(X, Y, board) {
	var x_size = board.length;
	var y_size = board[0].length;

	if (!checkCoords([X,Y], board)) {
		return false;
	}
	else if (board[X][Y] === -1) {
		return false;
	}
	return true;
}
