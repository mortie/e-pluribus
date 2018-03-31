import Entity from "./Entity.js";

export default class EntityDeathZone extends Entity {
	defaults() {
		return { x: -Infinity, y: 30, w: Infinity, h: Infinity };
	}

	constructor(level, props) {
		super(level, props);
		this.tag.enemy = true;
	}

	draw(ctx) {}
}
