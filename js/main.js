import Level from "./Level.js";
import assets from "./assets.js";
import levels from "./levels.js";

let canvas = document.getElementById("canvas");

let level = new Level(canvas, levels[0]);
level.start();

assets.music.loop = true;
assets.music.autoplay = true;

// Pause the game when the tab has been out of focus for more than half a second
let blurTimeout = null;
window.addEventListener("focus", () => {
	if (blurTimeout != null) {
		clearTimeout(blurTimeout);
		blurTimeout = null;
	}
	level.resume();
});
window.addEventListener("blur", () => {
	if (blurTimeout == null) {
		blurTimeout = setTimeout(() => level.pause(), 500);
	}
});

// Resize canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
