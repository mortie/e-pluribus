import Entity from "./Entity.js";
import colors from "./colors.js";

export default class EntityBarrier extends Entity {
	defaults() {
		return { w: 0.5, h: 0.5, listen: "", inverted: false };
	}

	constructor(level, props) {
		super(level, props);
		this.listen = props.listen;
		this.default = !props.inverted;
		this.prevWall = true;
		this.tag.wall = true;
	}

	update(dt) {
		if (this.level.triggers[this.listen]) {
			this.tag.wall = !this.default;
		} else {
			this.tag.wall = this.default;
		}

		if (this.tag.wall != this.prevWall)
			this.image.render();

		this.prevWall = this.tag.wall;
	}

	fillImage(ctx) {
		if (this.tag.wall) {
			this.bounds.outline(ctx);
			ctx.fillStyle = colors.good;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = colors.background;
			ctx.fill();
		} else {
			let midX = this.bounds.size.pixelX / 2;
			let midY = this.bounds.size.pixelY / 2;
			let w = this.bounds.size.pixelX / 6;
			let h = 1;
			if (this.bounds.size.y > this.bounds.size.x) {
				let tmp = w;
				w = h;
				h = tmp;
			}
			ctx.beginPath();
			ctx.moveTo(midX - w, midY + h);
			ctx.lineTo(midX - w, midY - h);
			ctx.lineTo(midX + w, midY - h);
			ctx.lineTo(midX + w, midY + h);
			ctx.closePath();
			ctx.fillStyle = colors.good;
			ctx.fill();
		}
	}
}
