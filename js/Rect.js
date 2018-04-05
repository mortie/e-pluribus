import Vec2 from "./Vec2.js";

export default class Rect {
	constructor(pos = new Vec2(), size = new Vec2()) {
		this.pos = pos;
		this.size = size;
	}

	draw(ctx) {
		this.outline(ctx);
		ctx.stroke();
	}

	outline(ctx, padding = 0) {
		ctx.beginPath();
		ctx.moveTo(+padding, +padding);
		ctx.lineTo(this.size.pixelX - padding, +padding);
		ctx.lineTo(this.size.pixelX - padding, this.size.pixelY - padding);
		ctx.lineTo(+padding, this.size.pixelY - padding);
		ctx.closePath();
	}

	intersects(other) {
		return (
			(this.left < other.right && this.right > other.left) &&
			(this.top < other.bottom && this.bottom > other.top));
	}

	intersectSide(other) {
		if (this.midY - other.bottom >= 0)
			return "bottom";
		else if (this.midY - other.top <= 0)
			return "top";
		else if (this.midX - other.left <= 0)
			return "left";
		else if (this.midX - other.right >= 0)
			return "right";
	}

	contains(other) {
		return (
			(this.left <= other.left && this.right >= other.right) &&
			(this.top <= other.top && this.bottom >= other.bottom));
	}

	get midX() {
		return this.pos.x + (this.size.x / 2);
	}
	get midY() {
		return this.pos.y + (this.size.y / 2);
	}

	get top() {
		return this.pos.y;
	}
	set top(n) {
		this.pos.y = n;
	}
	get pixelTop() {
		return this.pos.pixelY;
	}
	set pixelTop(y) {
		this.pos.pixelY = y;
	}
	resizeTopTo(y) {
		let diff = y - this.top;
		this.top = y;
		this.size.y += diff;
	}
	pixelResizeTopTo(y) {
		let diff = y - this.pixelTop;
		this.pixelTop = y;
		this.size.pixelY += diff;
	}

	get bottom() {
		return this.pos.y + this.size.y;
	}
	set bottom(y) {
		this.pos.y = y - this.size.y;
	}
	get pixelBottom() {
		return this.pos.pixelY + this.size.pixelY;
	}
	set pixelBottom(y) {
		this.pos.pixelY = y + this.size.pixelY;
	}
	resizeBottomTo(y) {
		let diff = y - this.bottom;
		this.size.y += diff;
	}
	pixelResizeBottomTo(y) {
		let diff = y - this.pixelBottom;
		this.size.pixelY += diff;
	}

	get left() {
		return this.pos.x;
	}
	set left(x) {
		this.pos.x = x;
	}
	get pixelLeft() {
		return this.pos.pixelX;
	}
	set pixelLeft(x) {
		this.pos.pixelX = x;
	}
	resizeLeftTo(x) {
		let diff = x - this.left;
		this.left = x;
		this.size.x += diff;
	}
	pixelResizeLeftTo(x) {
		let diff = x - this.pixelLeft;
		this.pixelLeft = x;
		this.size.pixelX += diff;
	}

	get right() {
		if (this.size.x == Infinity)
			return Infinity;
		return this.pos.x + this.size.x;
	}
	set right(n) {
		this.pos.x = n - this.size.x;
	}
	get pixelRight() {
		return this.pos.pixelX + this.size.pixelX;
	}
	set pixelRight(x) {
		this.pos.pixelX = x + this.size.pixelX;
	}
	resizeRightTo(x) {
		let diff = x - this.right;
		this.size.x += diff;
	}
	pixelResizeRightTo(x) {
		let diff = x - this.pixelRight;
		this.size.pixelX += diff;
	}
}
