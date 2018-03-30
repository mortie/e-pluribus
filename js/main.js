import Level from "./Level.js";
import assets from "./assets.js";
import levels from "./levels.js";

let canvas = document.getElementById("canvas");

let level = new Level(canvas, levels[0]);
level.start();

assets.music.loop = true;
assets.music.autoplay = true;

// Resize canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
