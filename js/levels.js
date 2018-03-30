import {Spawner} from "./Level.js";
import Vec2 from "./Vec2.js";

import EntityPlayer from "./EntityPlayer.js";
import EntityWall from "./EntityWall.js";
import EntityEnemy from "./EntityEnemy.js";

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
		[ EntityPlayer, { x: 10, y: 5 } ],
		[ EntityWall, { x: 9, y: 12, w: 5 } ],
		[ EntityEnemy, { x: 14, y: 13, w: 8 } ],
	]),
];
