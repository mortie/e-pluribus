import Trait from "./Trait.js";

export default class TraitFall extends Trait {
	constructor(ent) {
		super(ent);
		this.gravity = 20;
	}

	update(dt) {
		this.entity.velocity.y += this.gravity * dt;
	}
}
