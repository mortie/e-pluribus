let meter = 32;

export default class Vec2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vec2(this.x, this.y);
	}

	get pixelX() {
		return Math.floor(this.x * meter);
	}
	set pixelX(x) {
		this.x = Math.floor(x) / meter;
	}

	get pixelY() {
		return Math.floor(this.y * meter);
	}
	set pixelY(y) {
		this.y = Math.floor(y) / meter;
	}
}

Vec2.zero = new Vec2();
