import Trait from "./Trait.js";
import Vec2 from "./Vec2.js";

export default class TraitWallHitter extends Trait {
	constructor(ent, filter) {
		super(ent);
		this.filter = filter;
		this.collision = false;
		this.onTopOf = null;
		this.prevOnTopOf = null;
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
			e1.bounds.bottom = e2.bounds.top + 0.001;
			e1.velocity.y = e2.velocity.y;
			this.onTopOf = e2;
			return true;
		}

		return false;
	}

	update(dt) {
		this.prevOnTopOf = this.onTopOf;
		this.collision = false;
		let moved = false;
		let level = this.entity.level;

		do {
			moved = false;

			for (let ent of level.wallEntities) {
				if (this.collide(ent)) {
					this.collision = true;
				}
			}
		} while (moved);

		if (this.onTopOf && !this.prevOnTopOf) {
			this.entity.relativeTo = this.onTopOf;
			this.entity.velocity.sub(this.onTopOf.relativeVelocity());
		} else if (!this.onTopOf && this.prevOnTopOf) {
			this.entity.velocity.add(this.prevOnTopOf.relativeVelocity());
			this.entity.relativeTo = null;
		}
	}
}
