import Entity from "./Entity.js";
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
		this.lineHeight = null;
		this.textConfigured = false;
		this.fontSize = 20;
	}

	setFont(ctx) {
		ctx.font = this.fontSize+"px monospace";
	}

	draw(ctx) {
		if (!this.textConfigured) {
			ctx.fillStyle = colors.evil;
			this.setFont(ctx);
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

			while (this.fontSize > 5 && widestLineLen > this.bounds.size.pixelX - 8) {
				this.fontSize -= 1;
				this.setFont(ctx);
				widestLineLen = ctx.measureText(widestLine).width;
			}

			this.lineHeight = this.fontSize;
			this.bounds.size.pixelY = this.lineHeight * this.lines.length + 18;
			this.textConfigured = true;
		}

		this.bounds.outline(ctx);
		ctx.fillStyle = colors.good;
		ctx.fill();

		this.bounds.outline(ctx, 4);
		ctx.fillStyle = colors.background;
		ctx.fill();

		ctx.fillStyle = colors.evil;
		this.setFont(ctx);
		ctx.textBaseline = "hanging";

		for (let i in this.lines) {
			ctx.fillText(
				this.lines[i],
				this.pos.pixelX + 8,
				this.pos.pixelY + 10 + (this.lineHeight * i));
		}

		// ctx.textBaseline = "bottom";
		// ctx.fillText(this.fontSize, this.pos.pixelX, this.pos.pixelY);
	}
}
