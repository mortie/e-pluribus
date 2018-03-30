import colors from "./colors.js";

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
	constructor(can, initialSpawners) {
		this.can = can;
		this.can.style.background = colors.background;
		this.ctx = this.can.getContext("2d");
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

		this.entities = [];
		this.wallEntities = [];
		this.enemyEntities = [];
		this.global = {};

		this.raf = null;
		this.lastTime = null;
		this.boundUpdate = this.update.bind(this);
		this.deathZone = 40;
	}

	oops() {
		alert("You lost!");
		this.start();
	}

	update(time) {
		this.running = true;
		if (this.lastTime != null) {
			let dt = (time - this.lastTime) / 1000;

			if (dt <= this.maxPeriod) {
				this.timeAcc += dt;

				let fixedUpdated = false;
				while (this.timeAcc >= this.updatePeriod) {
					fixedUpdated = true;
					for (let ent of this.entities) {
						ent._update(this.updatePeriod);
					}
					this.timeAcc -= this.updatePeriod;
				}

				this.ctx.beginPath();
				this.ctx.clearRect(0, 0, this.can.width, this.can.height);
				for (let ent of this.entities) {
					if (!fixedUpdated)
						ent._dynamicUpdate(dt);
					this.ctx.save();
					ent._draw(this.ctx);
					this.ctx.restore();
				}
			}
		}
		if (this.running) {
			this.lastTime = time;
			this.raf = requestAnimationFrame(this.boundUpdate);
		}
	}

	spawn(ent) {
		this.entities.push(ent);
		if (ent.tag.wall)
			this.wallEntities.push(ent);
		if (ent.tag.enemy)
			this.enemyEntities.push(ent);
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
		this.pause();

		for (let ent of this.entities)
			ent.end();

		this.global = {
			player: {},
		};
		this.entities = [];
		this.wallEntities = [];
		this.enemyEntities = [];
		for (let s of this.spawners) {
			this.spawn(s.create(this));
		}
		for (let ent of this.entities)
			ent.init();

		this.resume();
	}
}
