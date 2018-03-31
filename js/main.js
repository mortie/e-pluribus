import Level from "./Level.js";
import assets from "./assets.js";
import levels from "./levels.js";

let canvas = document.getElementById("canvas");

let nextLevel = levels.length - 2;
//let nextLevel = 0;
let level = new Level(canvas, start);
function start() {
	if (nextLevel >= levels.length) {
		level.pause();
		alert("You won the game.");
		nextLevel = 0;
	}

	level.init(levels[nextLevel++]);
	level.start();
}
start();

assets.music.loop = true;
assets.music.autoplay = true;
assets.music.volume = 0.4;

// Resize canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
