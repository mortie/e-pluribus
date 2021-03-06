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
		[ EntityTextBox, { x: 9, y: 5, w: 15, text: 
			"This is a story...\n"+
			"A story about my bloodline, and the journey my ancestors\n"+
			"have travelled to get where we are today.\n"+
			"Join me, and see how it all started..." } ],

		[ EntityPlayer, { x: 5, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 28, y: 10 } ],
		[ EntityWall, { x: 4, y: 11, w: 25 } ],
	]),

	level([
		[ EntityTextBox, { x: 12, y: 5, w: 7, text: 
			"Follow "+names.mainCharacter+"'s path..." } ],

		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 20, y: 10 } ],
		[ EntityWall, { x: 9, y: 11, w: 5 } ],
		[ EntityWall, { x: 17, y: 11, w: 5 } ],
		[ EntityEnemy, { x: 14, y: 12, w: 3 } ],
	]),

	level([
		[ EntityTextBox, { x: 9, y: 5, w: 13, text: 
			"My grandfather used to say, \"The ladder to success\n"+
			"usually starts with your ancestors at the bottom\".\n"+
			"I never understood that..." } ],

		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 24, y: 7 } ],
		[ EntityWall, { x: 9, y: 11, w: 15 } ],
		[ EntityWall, { x: 24, y: 8, w: 1, h: 3 } ],
		[ EntitySpike, { x: 23, y: 10 } ],
		[ EntitySpike, { x: 23, y: 9 } ],
		[ EntitySpike, { x: 23, y: 8 } ],
	]),

	level([
		[ EntityTextBox, { x: 6, y: 5, w: 15, text: 
			names.mainCharacter+" had two brothers. One was good, but made\n"+
			"a horrible choice. The other was evil by nature, but made\n"+
			"the necessary sacrifice in the end." } ],

		[ EntityPlayer, { x: 10, y: 10 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 7, y: 14 } ],
		[ EntityWall, { x: 6, y: 11, w: 5 } ],
		[ EntityWall, { x: 13, y: 15, w: 3 } ],
		[ EntityWall, { x: 7, y: 15, w: 3 } ],
		[ EntityEnemy, { x: 10, y: 16, w: 3 } ],
		[ EntityTrigger, { x: 14, y: 14, target: "player", action: "open" } ],
		[ EntityBarrier, { x: 9, y: 14, h: 1, listen: "open" } ],
	]),

	level([
		[ EntityTextBox, { x: 4, y: 4, w: 15, text: 
			"\"Life is to short to stop and take a break\"...\n"+
			"Easy for her to say. She had 5 siblings, no wonder life\n"+
			"went fast for her... Some would say too fast." } ],

		[ EntityPlayer, { x: 5, y: 10, lives: 5 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 18, y: 8 } ],
		[ EntityWall, { x: 4, y: 11, w: 3 } ],
		[ EntityWall, { x: 15, y: 9, w: 5 } ],
	]),

	level([
		[ EntityTextBox, { x: 4, y: 4, w: 15, text: 
			"We all had to work together..." } ],

		[ EntityPlayer, { x: 5, y: 10, lives: 5 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 23, y: 8 } ],
		[ EntityWall, { x: 4, y: 11, w: 5 } ],
		[ EntityWall, { x: 20, y: 9, w: 5 } ],
	]),

	level([
		[ EntityTextBox, { x: 4, y: 5, w: 15, text: 
			"Sometimes, the challenges were more cerebral than physical.\n"+
			"We had to put our brains together, think..."} ],

		[ EntityPlayer, { x: 7, y: 10, lives: 5 } ],
		[ EntityDeathZone, {} ],
		[ EntityVictory, { x: 4.5, y: 10 } ],
		[ EntityWall, { x: 4, y: 11, w: 7 } ],
		[ EntityWall, { x: 17, y: 16, w: 5 } ],
		[ EntityTrigger, { x: 8, y: 15, target: "player", action: "open-1" } ],
		[ EntityTrigger, { x: 20, y: 11, target: "player", action: "open-2" } ],
		[ EntityTrigger, { x: 20, y: 15, target: "player", action: "open-3" } ],
		[ EntityBarrier, { x: 6, y: 9.5, h: 1.5, listen: "open-3" } ],
		[ EntityBarrier, { x: 3.5, y: 9, w: 2.5, listen: "open-3" } ],
		[ EntityBarrier, { x: 13, y: 9, h: 5, listen: "open-1" } ],
		[ EntityBarrier, { x: 12, y: 12, w: 10, listen: "open-1", inverted: true } ],
		[ EntityBarrier, { x: 7, y: 16, w: 5, listen: "open-2" } ],
	]),
];
