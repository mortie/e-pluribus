import Entity from "./Entity.js";
import colors from "./colors.js";

export default class EntityWall extends Entity {
	defaults() {
		return { w: 3, h: 1 };
	}

	constructor(level, props) {
		super(level, props);
		this.tag.wall = true;
	}

	draw(ctx) {
		this.bounds.outline(ctx);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.bounds.outline(ctx, 4);
		ctx.fillStyle = colors.background;
		ctx.fill();

		this.bounds.outline(ctx, 8);
		ctx.fillStyle = colors.evil;
		ctx.fill();

		this.bounds.outline(ctx, 12);
		ctx.fillStyle = colors.background;
		ctx.fill();
	}
}
