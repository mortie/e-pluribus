import Entity from "./Entity.js";
import Vec2 from "./Vec2.js";
import colors from "./colors.js";

export default class EntityVictory extends Entity {
	defaults() {
		return { d: 1, target: "" };
	}

	constructor(level, props) {
		super(level, props);
		this.target = props.target;
		this.radius = (props.d / 2) * Vec2.meter;;
		this.bounds.size.set(props.d, props.d);
	}

	preUpdate(dt) {
		for (let ent of this.level.lookup(this.target)) {
			if (ent.bounds.intersects(this.bounds)) {
				this.level.win();
				return;
			}
		}
	}

	outlineCircle(ctx, padding = 0) {
		ctx.beginPath();
		ctx.arc(
			this.pos.pixelX + this.radius,
			this.pos.pixelY + this.radius,
			this.radius - padding, 0, 2 * Math.PI);
	}

	draw(ctx) {
		this.outlineCircle(ctx, 2);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.outlineCircle(ctx, 6);
		ctx.fillStyle = colors.background;
		ctx.fill();

		this.outlineCircle(ctx, 11);
		ctx.fillStyle = colors.evil;
		ctx.fill();
	}
}
