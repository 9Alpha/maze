var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var clicked = false;
var w = false;
var a = false;
var s = false;
var d = false;
var mouseX, mouseY, pmouseX, pmouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cubes = [];

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

camera.position.z = 0;
camera.position.y = 1;
camera.position.x = 1;


var render = function () {
	requestAnimationFrame(render);
	renderer.render(scene, camera);

	if (clicked) {
		camera.rotation.y -= (pmouseX - mouseX)/50;
		camera.rotation.x -= (pmouseY - mouseY)/50;
	} 

	if (w) {
		camera.position.x+=.01;
	}
	if (a) {
		camera.position.y+=.01;
	}
	if (s) {
		camera.position.x-=.01;
	}
	if (d) {
		camera.position.y-=.01;
	}
};


$(document).ready(function () {
	console.log("ready");
	var wid = 10;
	var hig = 10;
	var maze = new Tree(1, 1);
	maze = makeMaze(1, 1, wid, hig, maze);

	for (var i = 0; i < maze.length; i++) {
		cubes.push(new THREE.Mesh(geometry, material));
		cubes[i].position.x = maze[i].x;
		cubes[i].position.y = maze[i].y;
		scene.add(cubes[i]);
	}
	
});

$(document).mousemove(function (e) {
	pmouseX = mouseX;
	pmouseY = mouseY;

	mouseX = e.pageX;
	mouseY = e.pageY;

	//console.log((pmouseX-mouseX)+", "+(pmouseY-mouseY));
});

$(document).keydown(function(e) {
	if(e.which == 87) {
		w = true;
	} else if(e.which == 83) {
		s = true;
	} else if(e.which == 65) {
		a = true;
	} else if(e.which == 68) {
		d = true;
	}
});

$(document).keyup(function(e) {
	if(e.which == 87) {
		w = false;
	} else if(e.which == 83) {
		s = false;
	} else if(e.which == 65) {
		a = false;
	} else if(e.which == 68) {
		d = false;
	}
});


$(document).mousedown(function (e) {
	clicked = true;
});

$(document).mouseup(function (e) {
	clicked = false;
});

render();