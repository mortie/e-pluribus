export default class Prerendered {
	constructor(func) {
		this.can = document.createElement("canvas");
		this.ctx = this.can.getContext("2d");
		this.func = func;
	}

	render() {
		this.ctx.clearRect(0, 0, this.can.width, this.can.height);
		this.func(this.ctx, this.can);
	}

	draw(ctx, x, y) {
		ctx.drawImage(this.can, x, y, this.can.width, this.can.height);
	}

	drawAt(ctx, vec) {
		this.draw(ctx, vec.pixelX, vec.pixelY);
	}
}
