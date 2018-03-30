import Vec2 from "./Vec2.js";
import Rect from "./Rect.js";

export default class Entity {
	defaults() { return {} }

	constructor(level, props) {
		this.level = level;
		this.tag = {
			enemy: false,
			wall: false,
			player: false,
		};
		let defs = this.defaults();
		for (let i in defs) {
			if (props[i] === undefined)
				props[i] = defs[i];
		}

		this.pos = new Vec2(props.x || 0, props.y || 0);
		this.prevPos = new Vec2(this.pos.x, this.pos.y);
		this.displayPos = new Vec2(this.pos.x, this.pos.y);
		this.velocity = new Vec2(props.vx || 0, props.vy || 0);
		this.bounds = new Rect(this.pos, new Vec2(props.w || 0, props.h || 0));
	}

	_draw(ctx) {
		let tmp = this.pos;
		this.bounds.pos = this.pos = this.displayPos;
		this.draw(ctx);
		this.bounds.pos = this.pos = tmp;
	}
	draw(ctx) {
		this.bounds.draw(ctx);
	}

	_dynamicUpdate(dt) {
		let steps = this.level.updatePeriod / dt;
		let diffx = this.pos.x - this.prevPos.x;
		let diffy = this.pos.y - this.prevPos.y;
		this.displayPos.x += diffx / steps;
		this.displayPos.y += diffy / steps;
	}

	_update(dt) {
		this.update(dt);
		this.prevPos.set(this.pos.x, this.pos.y);
		this.displayPos.set(this.pos.x, this.pos.y);

		this.postUpdate(dt);
	}
	update(dt) {}
	postUpdate(dt) {
		this.pos.x += this.velocity.x * dt;
		this.pos.y += this.velocity.y * dt;
	}

	collideX() {}
	collideY() {}

	end() {}
}
