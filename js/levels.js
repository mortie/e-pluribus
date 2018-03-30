import {Spawner} from "./Level.js";
import Vec2 from "./Vec2.js";

import EntityPlayer from "./EntityPlayer.js";
import EntityWall from "./EntityWall.js";
import EntityEnemy from "./EntityEnemy.js";
import EntityTextBox from "./EntityTextBox.js";

function level(arr) {
	let spawners = [];
	for (let entry of arr) {
		let [ cnst, props ] = entry;
		spawners.push(new Spawner(cnst, props));
	}
	return spawners;
}

export default [
	level([
		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityWall, { x: 9, y: 12, w: 10 } ],

		[ EntityTextBox, { x: 7, y: 5, w: 14.5, text: 
			"This is a story...\n"+
			"A story about my bloodline, and the journey my ancestors\n"+
			"have travelled to get where we are today...\n"+
			"Join me...\n"+
			"Let's see how it all started..." } ],
	]),
];
