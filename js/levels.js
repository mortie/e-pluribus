import {Spawner} from "./Level.js";
import names from "./names.js";
import Vec2 from "./Vec2.js";

import EntityPlayer from "./EntityPlayer.js";
import EntityWall from "./EntityWall.js";
import EntityEnemy from "./EntityEnemy.js";
import EntityDeathZone from "./EntityDeathZone.js";
import EntitySpike from "./EntitySpike.js";
import EntityTextBox from "./EntityTextBox.js";
import EntityVictory from "./EntityVictory.js";
import EntityTrigger from "./EntityTrigger.js";
import EntityBarrier from "./EntityBarrier.js";

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
		[ EntityPlayer, { x: 5, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 28, y: 10 } ],
		[ EntityWall, { x: 4, y: 11, w: 25 } ],

		[ EntityTextBox, { x: 9, y: 5, w: 15, text: 
			"This is a story...\n"+
			"A story about my bloodline, and the journey my ancestors\n"+
			"have travelled to get where we are today.\n"+
			"Join me, and see how it all started..." } ],
	]),

	level([
		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 20, y: 10 } ],
		[ EntityWall, { x: 9, y: 11, w: 5 } ],
		[ EntityWall, { x: 17, y: 11, w: 5 } ],
		[ EntityEnemy, { x: 14, y: 12, w: 3 } ],

		[ EntityTextBox, { x: 12, y: 5, w: 7, text: 
			"Follow "+names.mainCharacter+"'s path..." } ],
	]),

	level([
		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityWall, { x: 9, y: 11, w: 15 } ],
		[ EntitySpike, { x: 23, y: 10 } ],
		[ EntitySpike, { x: 23, y: 9 } ],
		[ EntitySpike, { x: 23, y: 8 } ],
		[ EntityWall, { x: 24, y: 8, w: 1, h: 3 } ],
		[ EntityVictory, { x: 24, y: 7 } ],

		[ EntityTextBox, { x: 9, y: 5, w: 13, text: 
			"My grandfather used to say, \"The ladder to success\n"+
			"usually starts with your ancestors at the bottom\".\n"+
			"I never understood that..." } ],
	]),

	level([
		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityWall, { x: 6, y: 11, w: 5 } ],
		[ EntityWall, { x: 13, y: 15, w: 3 } ],
		[ EntityEnemy, { x: 10, y: 16, w: 3 } ],
		[ EntityWall, { x: 7, y: 15, w: 3 } ],
		[ EntityTrigger, { x: 14, y: 14, target: "player", action: "open" } ],
		[ EntityBarrier, { x: 9, y: 14, h: 1, listen: "open" } ],
		[ EntityVictory, { x: 7, y: 14 } ],

		[ EntityTextBox, { x: 6, y: 5, w: 15, text: 
			names.mainCharacter+" had two brothers. One was good, but made\n"+
			"a horrible choice. The other was evil by nature, but made\n"+
			"the necessary sacrifice in the end." } ],
	]),

	level([
		[ EntityPlayer, { x: 5, y: 10, lives: 5 } ],
		[ EntityDeathZone, {} ],
		[ EntityWall, { x: 4, y: 11, w: 3 } ],
		[ EntityWall, { x: 15, y: 9, w: 5 } ],
		[ EntityVictory, { x: 18, y: 8 } ],

		[ EntityTextBox, { x: 4, y: 4, w: 15, text: 
			"\"Life is to short to stop and take a break\"...\n"+
			"Easy for her to say. She had 5 siblings, no wonder life\n"+
			"went fast for her... Some would say too fast." } ],
	]),

	level([
		[ EntityPlayer, { x: 5, y: 10, lives: 5 } ],
		[ EntityDeathZone, {} ],
		[ EntityWall, { x: 4, y: 11, w: 5 } ],
		[ EntityWall, { x: 20, y: 9, w: 5 } ],
		[ EntityVictory, { x: 23, y: 8 } ],

		[ EntityTextBox, { x: 4, y: 4, w: 15, text: 
			"We all had to work together..." } ],
	]),
];
