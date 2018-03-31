import Entity from "./Entity.js";
import colors from "./colors.js";

export default class EntityBarrier extends Entity {
	defaults() {
		return { w: 0.5, h: 0.5, listen: "" };
	}

	constructor(level, props) {
		super(level, props);
		this.listen = props.listen;
		this.tag.wall = true;
	}

	preUpdate(dt) {
		if (this.level.triggers[this.listen]) {
			this.tag.wall = false;
		} else {
			this.tag.wall = true;
		}
	}

	draw(ctx) {
		if (this.tag.wall) {
			this.bounds.outline(ctx);
			ctx.fillStyle = colors.good;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = colors.background;
			ctx.fill();
		} else {
			this.bounds.outline(ctx, 10);
			ctx.fillStyle = colors.good;
			ctx.fill();
		}
	}
}
