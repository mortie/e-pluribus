import Level from "./Level.js";
import assets from "./assets.js";
import levels from "./levels.js";

let canvas = document.getElementById("canvas");

//let nextLevel = levels.length - 1;
let nextLevel = 3;
let level = new Level(canvas, start);
function start() {
	if (nextLevel >= levels.length) {
		level.pause();
		alert("You won the game.");
	} else {
		level.init(levels[nextLevel++]);
		level.start();
	}
}
start();

assets.music.loop = true;
assets.music.autoplay = true;

// Resize canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
