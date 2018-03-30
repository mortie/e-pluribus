import Entity from "./Entity.js";
import TraitFall from "./TraitFall.js";
import TraitWallHitter from "./TraitWallHitter.js";
import colors from "./colors.js";
import {Spawner} from "./Level.js";

class Input {
	constructor(log) {
		this.left = false;
		this.right = false;
	}

	update(dt) {}
	end() {}
}

class LogInput extends Input {
	constructor(log) {
		super();

		this.log = log;
		this.time = 0;
		this.index = 0;
	}

	update(dt) {
		this.left = this.right = false;

		if (this.log.length > this.index) {
			let l = this.log[this.index];

			if (l.time <= this.time) {
				this.left = l.left;
				this.right = l.right;
				this.index += 1;
			}
		}

		this.time += dt;
	}
}

class KeyboardInput extends Input {
	constructor() {
		super();

		this.log = [];
		this.time = 0;

		let map = {
			KeyA: "left",
			ArrowLeft: "left",
			KeyD: "right",
			ArrowRight: "right",
		};
		this.left = false;
		this.right = false;

		function cb(evt) {
			let name = map[evt.code];
			if (!name) return;
			this[name] = evt.type === "keydown";
		}
		this._cb = cb.bind(this);

		window.addEventListener("keydown", this._cb);
		window.addEventListener("keyup", this._cb);
	}

	update(dt) {
		this.log.push({
			time: this.time,
			left: this.left,
			right: this.right,
		});
		this.time += dt;
	}

	end() {
		window.removeEventListener("keydown", this._cb);
		window.removeEventListener("keyup", this._cb);
	}
}

export default class EntityPlayer extends Entity {
	defaults() {
		return { w: 1, h: 1, log: null };
	}

	constructor(level, props) {
		super(level, props);

		this.tag.wall = true;
		this.tag.player = true;

		this.startPos = this.pos.clone();

		this.traitFall = new TraitFall(this);
		this.traitWallHitter = new TraitWallHitter(this, ent => {
			if (!ent.tag.player)
				return true;
			return this.index < ent.index;
		});

		if (this.level.global.player.nextIndex == null)
			this.level.global.player.nextIndex = 1;

		if (props.log) {
			this.input = new LogInput(props.log);
			this.keyboardControlled = false;
			this.index = this.level.global.player.nextIndex++;
		} else {
			this.input = new KeyboardInput();
			this.keyboardControlled = true;
			this.index = 0;
		}

		this.pos.y += this.index * this.bounds.size.y;

		this.active = true;
		this.groundSpeed = 140;
		this.airSpeed = 20;
		this.groundFriction = 25;
		this.airFriction = 3;
	}

	init() {
		this.pos.y -= (this.level.global.player.nextIndex - 1) * this.bounds.size.y;
	}

	get name() {
		return (this.level.global.player.nextIndex) - this.index;
	}

	update(dt) {
		if (!this.active) {
			this.velocity.set(0, 0);
			return;
		}

		this.traitFall.update(dt);
		this.input.update(dt);

		let onGround = this.traitWallHitter.collision;
		let fric = onGround ? this.groundFriction : this.airFriction;
		let speed = onGround ? this.groundSpeed : this.airSpeed;

		if (this.input.left)
			this.velocity.x -= speed * dt;
		if (this.input.right)
			this.velocity.x += speed * dt;

		var xRatio = 1 / (1 + (dt * fric));
		this.velocity.x *= xRatio;

		// Noo if bad thing
		for (let ent of this.level.enemyEntities) {
			if (this.bounds.intersects(ent.bounds)) {
				this.die(ent);
				break;
			}
		}

		if (this.pos.y >= this.level.deathZone)
			this.die(null);

		this.traitWallHitter.update(dt);
	}

	postUpdate(dt) {
		super.postUpdate(dt);
		this.traitWallHitter.update(dt);
	}

	die(ent) {
		if (ent) {
			let side = this.bounds.intersectSide(ent.bounds);
			this.velocity.set(0, 0);
			this.active = false;

			if (side === "left")
				this.bounds.right = ent.bounds.left;
			if (side === "right")
				this.bounds.left = ent.bounds.right;
			if (side === "top")
				this.bounds.bottom = ent.bounds.top;
			if (side === "bottom")
				this.bounds.top = ent.bounds.bottom;
		}

		if (this.keyboardControlled) {
			this.level.spawners.unshift(new Spawner(EntityPlayer, {
				x: this.startPos.x,
				y: this.startPos.y,
				log: this.input.log,
			}));
			this.level.oops();
		}
	}

	end() {
		this.input.end();
	}

	draw(ctx) {
		if (this.keyboardControlled) {
			this.bounds.outline(ctx);
			ctx.fillStyle = colors.good;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = colors.background
			ctx.fill();

			this.bounds.outline(ctx, 8);
			ctx.fillStyle = colors.evil;
			ctx.fill();
		} else {
			this.bounds.outline(ctx);
			ctx.fillStyle = colors.good;
			ctx.fill();

			this.bounds.outline(ctx, 3);
			ctx.fillStyle = colors.background
			ctx.fill();

			this.bounds.outline(ctx, 14);
			ctx.fillStyle = colors.good
			ctx.fill();
		}

		ctx.fillStyle = "#fff";
		ctx.font = "16px serif";
		ctx.fillText(this.name, this.pos.pixelX, this.pos.pixelY);
	}
}
