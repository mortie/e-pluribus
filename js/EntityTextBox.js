import Entity from "./Entity.js";
import Vec2 from "./Vec2.js";
import colors from "./colors.js";

export default class EntityTextBox extends Entity {
	defaults() {
		return { w: 3, lineHeight: 0.6, text: "Hello World" };
	}

	constructor(level, props) {
		super(level, props);
		this.text = props.text;
		this.lines = this.text.split("\n");
		this.lineHeight = props.lineHeight * Vec2.meter;
		this.bounds.size.pixelY = this.lineHeight * this.lines.length + 8;
	}

	draw(ctx) {
		this.bounds.outline(ctx);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.bounds.outline(ctx, 4);
		ctx.fillStyle = colors.background;
		ctx.fill();

		ctx.fillStyle = colors.evil;
		ctx.font = "13px monospace";
		ctx.textBaseline = "hanging";

		for (let i in this.lines) {
			ctx.fillText(
				this.lines[i],
				this.pos.pixelX + 8,
				this.pos.pixelY + 10 + (this.lineHeight * i));
		}
	}
}
