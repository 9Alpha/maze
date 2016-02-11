
var wid;
var hig;
var mazeTree;
var doTheMaze = false;
var x, y;
var count = 0;

function setup() {
	var myCanvas = createCanvas(1600, 1200);
	background(0);
	wid = width/20;
	hig = height/20;
	fill(200);
	strokeWeight(0);
}

function draw() {


	if (doTheMaze && count % 1 === 0) {
		var neighbors = [true, true, true, true];
		var randSpot;
		var spotChosen = false;
		var complete = false;
		var openSpots = false;
		var px, py;


		//console.log(x+", "+y);

		mazeTree.traverseDF(function (node) {
			if (node.data.x === x-2 || node.data.x === x-1 || x-1 < 1) { 
				if (node.data.y === y || node.data.y === y+1 || node.data.y === y-1) {
					neighbors[3] = false;
				}
			} if (node.data.x === x+2 || node.data.x === x+1 || x+1 >= wid-1) { 
				if (node.data.y === y || node.data.y === y+1 || node.data.y === y-1) {
					neighbors[1] = false;
				}
			} if (node.data.y === y+2 || node.data.y === y+1 || y+1 >= hig-1){ 
				if (node.data.x === x || node.data.x === x+1 || node.data.x === x-1) {
					neighbors[2] = false;
				}
			} if (node.data.y === y-2 || node.data.y === y-1 || y-1 < 1) { 
				if (node.data.x === x || node.data.x === x+1 || node.data.x === x-1) {
					neighbors[0] = false;
				}
			}
		});


		for (var i = 0; i < neighbors.length; i++) {
			if (neighbors[i]) {
				openSpots = true;
			}
		}


		if (openSpots) {

			while(spotChosen === false) {
				randSpot = randomInt(0, 8);
				if (randSpot >= 0 && randSpot < 3) {
					randSpot = 1;
				} else if (randSpot >= 3 && randSpot < 6) {
					randSpot = 3;
				} else if (randSpot >= 6 && randSpot < 7) {
					randSpot = 0;
				} else if (randSpot >= 7 && randSpot < 8) {
					randSpot = 2;
				}
				if (neighbors[randSpot]) {
					spotChosen = true;
				}
			}

			if (randSpot === 0) {
				mazeTree.add(x, y-1, x, y, mazeTree.traverseDF);
				y--;
			} else if (randSpot === 1) {
				mazeTree.add(x+1, y, x, y, mazeTree.traverseDF);
				x++;
			} else if (randSpot === 2) {
				mazeTree.add(x, y+1, x, y, mazeTree.traverseDF);
				y++;
			} else if (randSpot === 3) {
				mazeTree.add(x-1, y, x, y, mazeTree.traverseDF);
				x--;
			}


			rect(x*20, y*20, 20, 20);

		}

		else {
			mazeTree.contains(mazeTree.traverseDF, function (node) {
				if (node.data.x === x && node.data.y === y) {
					if (node.parent === null) {
						complete = true;
					} else {
						px = node.parent.data.x;
						py = node.parent.data.y;
						return false;
					}
				}
			});

			if (complete) {
				doTheMaze = false;
				console.log("maze done");
			} else {
				x = px;
				y = py;
			}
		}
	}

	count++;
}

function keyTyped() {
	if (key === 'm') {
		background(0);
		mazeTree = new Tree(1, 1);
		x = 1;
		y = 1;
		doTheMaze = true;
		rect(x*20, y*20, 20, 20);
		//mazeTree = makeMaze(1, 1, mazeTree);
		//mazeTree.traverseDF(function (node) {
		//	rect(node.data.x*20, node.data.y*20, 20, 20);
		//});
}
}

function randomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




/*function makeMaze(x, y, maze) {
	var neighbors = [true, true, true, true];
	var randSpot;
	var spotChosen = false;
	var complete = false;
	var openSpots = false;
	var px, py;


	//console.log(x+", "+y);

	maze.traverseDF(function (node) {
		if (node.data.x === x-2 || node.data.x === x-1 || x-1 < 1) { 
			if (node.data.y === y || node.data.y === y+1 || node.data.y === y-1) {
				neighbors[3] = false;
			}
		} if (node.data.x === x+2 || node.data.x === x+1 || x+1 >= wid-1) { 
			if (node.data.y === y || node.data.y === y+1 || node.data.y === y-1) {
				neighbors[1] = false;
			}
		} if (node.data.y === y+2 || node.data.y === y+1 || y+1 >= hig-1) { 
			if (node.data.x === x || node.data.x === x+1 || node.data.x === x-1) {
				neighbors[2] = false;
			}
		} if (node.data.y === y-2 || node.data.y === y-1 || y-1 < 1) { 
			if (node.data.x === x || node.data.x === x+1 || node.data.x === x-1) {
				neighbors[0] = false;
			}
		}
	});


	for (var i = 0; i < neighbors.length; i++) {
		if (neighbors[i]) {
			openSpots = true;
		}
	}


	if (openSpots) {
		
		while(spotChosen === false) {
			randSpot = randomInt(0, 4);
			if (neighbors[randSpot]) {
				spotChosen = true;
			}
		}

		if (randSpot === 0) {
			maze.add(x, y-1, x, y, maze.traverseDF);
			return makeMaze(x, y-1, maze);
		} else if (randSpot === 1) {
			maze.add(x+1, y, x, y, maze.traverseDF);
			return makeMaze(x+1, y, maze);
		} else if (randSpot === 2) {
			maze.add(x, y+1, x, y, maze.traverseDF);
			return makeMaze(x, y+1, maze);
		} else if (randSpot === 3) {
			maze.add(x-1, y, x, y, maze.traverseDF);
			return makeMaze(x-1, y, maze);
		}

	}

	else {
		maze.contains(maze.traverseDF, function (node) {
			if (node.data.x === x && node.data.y === y) {
				if (node.parent === null) {
					complete = true;
				} else {
					px = node.parent.data.x;
					py = node.parent.data.y;
					return false;
				}
			}
		});

		if (complete) {
			return maze;
		} else {
			return makeMaze(px, py, maze);
		}
	}

}*/