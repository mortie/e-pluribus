import Entity from "./Entity.js";
import Vec2 from "./Vec2.js";
import colors from "./colors.js";

export default class EntityVictory extends Entity {
	defaults() {
		return { w: 1, h: 0.4, target: "", action: "" };
	}

	constructor(level, props) {
		super(level, props);
		this.target = props.target;
		this.action = props.action;
		this.pos.y += 1 - props.h;
		this.actioning = false;
	}

	preUpdate(dt) {
		this.actioning = false;
		for (let ent of this.level.lookup(this.target)) {
			if (ent.bounds.intersects(this.bounds)) {
				ent.onTriggering(this);
				this.level.triggers[this.action] = true;
				this.actioning = true;
				break;
			}
		}
	}

	outlineThingy(ctx, padding = 0) {
		ctx.beginPath();
		ctx.moveTo(this.pos.pixelX + padding, this.pos.pixelY + this.bounds.size.pixelY);
		ctx.lineTo(this.pos.pixelX + padding, this.pos.pixelY + padding);
		ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX - padding, this.pos.pixelY + padding);
		ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX - padding, this.pos.pixelY + this.bounds.size.pixelY);
		ctx.closePath();
	}

	draw(ctx) {
		this.bounds.outline(ctx);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.outlineThingy(ctx, 4);
		ctx.fillStyle = colors.background;
		ctx.fill();

		this.outlineThingy(ctx, 9);
		if (this.actioning)
			ctx.fillStyle = colors.evil;
		else
			ctx.fillStyle = colors.good;
		ctx.fill();
	}
}
