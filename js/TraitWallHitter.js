import Trait from "./Trait.js";

export default class TraitWallHitter extends Trait {
	constructor(ent, filter) {
		super(ent);
		this.filter = filter;
		console.log("filter:", this.filter);
		this.collision = null;
	}

	collide(e2) {
		let e1 = this.entity
		if (!e1.bounds.intersects(e2.bounds))
			return false;

		let side = e1.bounds.intersectSide(e2.bounds);
		if (this.filter && !this.filter(e2)) {
			return false;
		}

		if (side === "left" && e1.velocity.x > e2.velocity.x) {
			e1.bounds.right = e2.bounds.left;
			e1.velocity.x = e2.velocity.x;
			return true;
		} else if (side === "right" && e1.velocity.x < e2.velocity.x) {
			e1.bounds.left = e2.bounds.right;
			e1.velocity.x = e2.velocity.x;
			return true;
		} else if (side === "top" && e1.velocity.y >= e2.velocity.y) {
			e1.bounds.bottom = e2.bounds.top;
			e1.velocity.y = e2.velocity.y;
			return true;
		}

		return false;
	}

	update(dt) {
		this.collision = false;
		let moved = false;
		let level = this.entity.level;

		do {
			moved = false;

			for (let ent of level.wallEntities) {
				if (this.collide(ent))
					this.collision = true;
			}
		} while (moved);
	}
}
