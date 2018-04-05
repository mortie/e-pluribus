import Entity from "./Entity.js";
import Prerendered from "./Prerendered.js";
import Vec2 from "./Vec2.js";
import colors from "./colors.js";

export default class EntityTextBox extends Entity {
	defaults() {
		return { w: 3, text: "Hello World" };
	}

	constructor(level, props) {
		super(level, props);
		this.text = props.text;
		this.lines = this.text.split("\n");
	}

	fillImage(ctx, can) {
		let font = "monospace";

		let size = 20;

		ctx.fillStyle = colors.evil;
		ctx.font = size+"px "+font;
		ctx.textBaseline = "hanging";

		let widestLineLen = 0;
		let widestLine = "";
		for (let line of this.lines) {
			let w = ctx.measureText(line).width;
			if (w > widestLineLen) {
				widestLineLen = w;
				widestLine = line;
			}
		}

		while (size > 5 && widestLineLen > this.bounds.size.pixelX - 14) {
			size -= 1;
			ctx.font = size+"px "+font;
			widestLineLen = ctx.measureText(widestLine).width;
		}

		let lineHeight = size;
		this.bounds.size.pixelY = lineHeight * this.lines.length + 18;
		can.height = this.bounds.size.pixelY;

		this.bounds.outline(ctx);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.bounds.outline(ctx, 4);
		ctx.fillStyle = colors.background;
		ctx.fill();

		ctx.fillStyle = colors.evil;
		ctx.font = size+"px "+font;
		ctx.textBaseline = "hanging";

		for (let i in this.lines) {
			ctx.fillText(
				this.lines[i], 8,
				10 + (lineHeight * i));
		}
	}
}
