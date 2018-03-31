import colors from "./colors.js";
import Vec2 from "./Vec2.js";

export class Spawner {
	constructor(cnst, props) {
		this.cnst = cnst;
		this.props = props;
	}

	clone() {
		let props = {};
		for (let i in this.props)
			props[i] = this.props[i];
		return new Spawner(this.cnst, props);
	}

	create(level) {
		let ent = new this.cnst(level, this.props);
		ent.spawner = this;
		return ent;
	}
}

export default class Level {
	constructor(can, wincb) {
		this.can = can;
		this.can.style.background = colors.background;
		this.ctx = this.can.getContext("2d");
		this.wincb = wincb;
	}

	init(initialSpawners = this.initialSpawners) {
		this.pause();
		this.initialSpawners = initialSpawners;
		this.spawners = [];
		for (let s of this.initialSpawners) {
			this.spawners.push(s.clone());
		}

		this.maxPeriod = 1;
		this.updatePeriod = 1 / 60;
		this.timeAcc = 0;
		this.paused = true;
		this.running = false;
		this.won = false;

		this.entities = [];
		this.tags = {};
		this.ids = {};
		this.triggers = {};
		this.persistent = {};
		this.global = {};
		this.camera = new Vec2();

		this.raf = null;
		this.lastTime = null;
		this.boundUpdate = this.update.bind(this);
	}

	physics(dt) {
		for (let i in this.triggers)
			this.triggers[i] = false;

		for (let ent of this.entities) {
			ent.preUpdate(dt);
		}
		for (let ent of this.entities) {
			ent._update(dt);
		}
	}

	update(time) {
		this.running = true;
		if (this.lastTime != null) {
			let dt = (time - this.lastTime) / 1000;

			if (dt <= this.maxPeriod) {
				this.timeAcc += dt;

				// Accumu
				let fixedUpdated = false;
				while (this.timeAcc >= this.updatePeriod) {
					fixedUpdated = true;
					this.physics(this.updatePeriod);
					this.timeAcc -= this.updatePeriod;
				}

				this.ctx.beginPath();
				this.ctx.clearRect(0, 0, this.can.width, this.can.height);
				//this.ctx.translate(this.camera.pixelX, this.camera.pixelY);
				for (let ent of this.entities) {
					if (!fixedUpdated)
						ent._dynamicUpdate(dt);
					this.ctx.save();
					ent._draw(this.ctx);
					this.ctx.restore();
				}
			}
		}
		if (this.running && !this.paused) {
			this.lastTime = time;
			this.raf = requestAnimationFrame(this.boundUpdate);
		}
	}

	lookup(q) {
		if (typeof q === "string")
			q = [q];

		let arr = [];
		for (let str of q) {
			if (str[0] === "@") {
				if (this.ids[str])
					arr.push(this.ids[str]);
			} else {
				let tagged = this.tags[str];
				if (!tagged) {
					console.warn("Unknown tag: "+str);
					continue;
				}
				for (let ent of tagged)
					if (ent.tag[str])
						arr.push(ent);
			}
		}

		return arr;
	}

	spawn(ent) {
		this.entities.push(ent);
		if (ent.tag.wall)
			this.tags.wall.push(ent);
		if (ent.tag.enemy)
			this.tags.enemy.push(ent);
		if (ent.tag.player)
			this.tags.player.push(ent);
		if (ent.id)
			this.ids[ent.id] = ent;
	}

	pause() {
		if (this.paused) return;
		this.paused = true;
		this.running = false;
		cancelAnimationFrame(this.raf);
		this.lastTime = null;
	}

	resume() {
		if (!this.paused) return;
		this.paused = false;
		this.timeAcc = 0;
		this.update(null);
	}

	start() {
		this.won = false;
		this.pause();

		for (let ent of this.entities)
			ent.end();

		this.camera.set(0, 0);
		this.tags = {
			wall: [],
			enemy: [],
			player: [],
		}
		this.ids = {};
		this.triggers = {};
		this.global = {};
		this.entities = [];
		for (let s of this.spawners) {
			this.spawn(s.create(this));
		}
		for (let ent of this.entities)
			ent.init();

		this.resume();
	}

	win() {
		if (!this.won) {
			this.wincb();
			this.won = true;
		}
	}
}
