import Vec2 from "./Vec2.js";
import Rect from "./Rect.js";
import Prerendered from "./Prerendered.js";

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

		this.id = props.id || null;
		this.pos = new Vec2(props.x || 0, props.y || 0);
		this.prevPos = new Vec2(this.pos.x, this.pos.y);
		this.displayPos = new Vec2(this.pos.x, this.pos.y);
		this.velocity = new Vec2(props.vx || 0, props.vy || 0);
		this.relativeTo = null;
		this.bounds = new Rect(this.pos, new Vec2(props.w || 0, props.h || 0));
	}

	_init() {
		this.image = new Prerendered(this.fillImage.bind(this));
		this.init();
		this.image.can.width = this.bounds.size.pixelX;
		this.image.can.height = this.bounds.size.pixelY;
		this.image.render();
		this.displayPos.x = this.pos.x;
		this.displayPos.y = this.pos.y;
	}
	init() {}

	fillImage(ctx) {
		this.bounds.draw(ctx);
	}

	_draw(ctx) {
		this.draw(ctx);
	}
	draw(ctx) {
		this.image.drawAt(ctx, this.displayPos);
	}

	_dynamicUpdate(dt) {
		let steps = this.level.updatePeriod / dt;
		let diffx = this.pos.x - this.prevPos.x;
		let diffy = this.pos.y - this.prevPos.y;
		this.displayPos.x += diffx / steps;
		this.displayPos.y += diffy / steps;
	}

	_preUpdate(dt) {
		this.preUpdate(dt);
	}
	preUpdate(dt) {}

	_update(dt) {
		this.update(dt);
		this.prevPos.set(this.pos.x, this.pos.y);
		this.displayPos.set(this.pos.x, this.pos.y);
	}
	update(dt) {}

	_postUpdate(dt) {
		this.postUpdate(dt);
	}
	postUpdate(dt) {
		let vel = this.totalVelocity();
		this.pos.x += vel.x * dt;
		this.pos.y += vel.y * dt;
	}

	onTriggering(ent) {}

	totalVelocity() {
		return this.relativeVelocity().add(this.velocity);
	}

	relativeVelocity() {
		let vel = new Vec2();
		let relative = this.relativeTo;
		while (relative) {
			vel.x += relative.velocity.x;
			//vel.y += relative.velocity.y;
			relative = relative.relativeTo;
		}
		return vel;
	}

	collideX() {}
	collideY() {}

	end() {}
}
