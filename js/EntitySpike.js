import Entity from "./Entity.js";
import colors from "./colors.js";

export default class EntitySpike extends Entity {
	defaults() {
		return { w: 0.5, h: 0.7 };
	}

	constructor(level, props) {
		super(level, props);
		this.pos.x += 1 - props.w;
		this.pos.y += 1 - props.h;
		this.tag.enemy = true;
	}

	fillImage(ctx) {
		ctx.beginPath();
		ctx.moveTo(0, this.bounds.size.pixelY / 2);
		ctx.lineTo(this.bounds.size.pixelX, 0);
		ctx.lineTo(this.bounds.size.pixelX, this.bounds.size.pixelY);
		ctx.closePath();
		ctx.fillStyle = colors.evil;
		ctx.fill();
	}
}
