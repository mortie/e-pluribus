(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _Rect = require("./Rect.js");

var _Rect2 = _interopRequireDefault(_Rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
	_createClass(Entity, [{
		key: "defaults",
		value: function defaults() {
			return {};
		}
	}]);

	function Entity(level, props) {
		_classCallCheck(this, Entity);

		this.level = level;
		this.tag = {
			enemy: false,
			wall: false,
			player: false
		};
		var defs = this.defaults();
		for (var i in defs) {
			if (props[i] === undefined) props[i] = defs[i];
		}

		this.id = props.id || null;
		this.pos = new _Vec2.default(props.x || 0, props.y || 0);
		this.prevPos = new _Vec2.default(this.pos.x, this.pos.y);
		this.displayPos = new _Vec2.default(this.pos.x, this.pos.y);
		this.velocity = new _Vec2.default(props.vx || 0, props.vy || 0);
		this.relativeTo = null;
		this.bounds = new _Rect2.default(this.pos, new _Vec2.default(props.w || 0, props.h || 0));
	}

	_createClass(Entity, [{
		key: "init",
		value: function init() {}
	}, {
		key: "_draw",
		value: function _draw(ctx) {
			var tmp = this.pos;
			this.bounds.pos = this.pos = this.displayPos;
			this.draw(ctx);
			this.bounds.pos = this.pos = tmp;
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			this.bounds.draw(ctx);
		}
	}, {
		key: "_dynamicUpdate",
		value: function _dynamicUpdate(dt) {
			var steps = this.level.updatePeriod / dt;
			var diffx = this.pos.x - this.prevPos.x;
			var diffy = this.pos.y - this.prevPos.y;
			this.displayPos.x += diffx / steps;
			this.displayPos.y += diffy / steps;
		}
	}, {
		key: "preUpdate",
		value: function preUpdate(dt) {}
	}, {
		key: "_update",
		value: function _update(dt) {
			this.update(dt);
			this.prevPos.set(this.pos.x, this.pos.y);
			this.displayPos.set(this.pos.x, this.pos.y);

			this.postUpdate(dt);
		}
	}, {
		key: "update",
		value: function update(dt) {}
	}, {
		key: "postUpdate",
		value: function postUpdate(dt) {
			var vel = this.totalVelocity();
			this.pos.x += vel.x * dt;
			this.pos.y += vel.y * dt;
		}
	}, {
		key: "onTriggering",
		value: function onTriggering(ent) {}
	}, {
		key: "totalVelocity",
		value: function totalVelocity() {
			return this.relativeVelocity().add(this.velocity);
		}
	}, {
		key: "relativeVelocity",
		value: function relativeVelocity() {
			var vel = new _Vec2.default();
			var relative = this.relativeTo;
			while (relative) {
				vel.x += relative.velocity.x;
				//vel.y += relative.velocity.y;
				relative = relative.relativeTo;
			}
			return vel;
		}
	}, {
		key: "collideX",
		value: function collideX() {}
	}, {
		key: "collideY",
		value: function collideY() {}
	}, {
		key: "end",
		value: function end() {}
	}]);

	return Entity;
}();

exports.default = Entity;

},{"./Rect.js":12,"./Vec2.js":16}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityBarrier = function (_Entity) {
	_inherits(EntityBarrier, _Entity);

	_createClass(EntityBarrier, [{
		key: "defaults",
		value: function defaults() {
			return { w: 0.5, h: 0.5, listen: "" };
		}
	}]);

	function EntityBarrier(level, props) {
		_classCallCheck(this, EntityBarrier);

		var _this = _possibleConstructorReturn(this, (EntityBarrier.__proto__ || Object.getPrototypeOf(EntityBarrier)).call(this, level, props));

		_this.listen = props.listen;
		_this.tag.wall = true;
		return _this;
	}

	_createClass(EntityBarrier, [{
		key: "preUpdate",
		value: function preUpdate(dt) {
			if (this.level.triggers[this.listen]) {
				this.tag.wall = false;
			} else {
				this.tag.wall = true;
			}
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			if (this.tag.wall) {
				this.bounds.outline(ctx);
				ctx.fillStyle = _colors2.default.good;
				ctx.fill();

				this.bounds.outline(ctx, 4);
				ctx.fillStyle = _colors2.default.background;
				ctx.fill();
			} else {
				this.bounds.outline(ctx, 10);
				ctx.fillStyle = _colors2.default.good;
				ctx.fill();
			}
		}
	}]);

	return EntityBarrier;
}(_Entity3.default);

exports.default = EntityBarrier;

},{"./Entity.js":1,"./colors.js":18}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityDeathZone = function (_Entity) {
	_inherits(EntityDeathZone, _Entity);

	_createClass(EntityDeathZone, [{
		key: "defaults",
		value: function defaults() {
			return { x: -Infinity, y: 20, w: Infinity, h: Infinity };
		}
	}]);

	function EntityDeathZone(level, props) {
		_classCallCheck(this, EntityDeathZone);

		var _this = _possibleConstructorReturn(this, (EntityDeathZone.__proto__ || Object.getPrototypeOf(EntityDeathZone)).call(this, level, props));

		_this.tag.enemy = true;
		return _this;
	}

	_createClass(EntityDeathZone, [{
		key: "draw",
		value: function draw(ctx) {}
	}]);

	return EntityDeathZone;
}(_Entity3.default);

exports.default = EntityDeathZone;

},{"./Entity.js":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityEnemy = function (_Entity) {
	_inherits(EntityEnemy, _Entity);

	_createClass(EntityEnemy, [{
		key: "defaults",
		value: function defaults() {
			return { w: 3, h: 1 };
		}
	}]);

	function EntityEnemy(level, props) {
		_classCallCheck(this, EntityEnemy);

		var _this = _possibleConstructorReturn(this, (EntityEnemy.__proto__ || Object.getPrototypeOf(EntityEnemy)).call(this, level, props));

		_this.tag.enemy = true;
		_this.tag.wall = true;
		return _this;
	}

	_createClass(EntityEnemy, [{
		key: "draw",
		value: function draw(ctx) {
			this.bounds.outline(ctx);
			ctx.fillStyle = _colors2.default.evil;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();

			this.bounds.outline(ctx, 8);
			ctx.fillStyle = _colors2.default.good;
			ctx.fill();

			this.bounds.outline(ctx, 12);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();
		}
	}]);

	return EntityEnemy;
}(_Entity3.default);

exports.default = EntityEnemy;

},{"./Entity.js":1,"./colors.js":18}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _TraitFall = require("./TraitFall.js");

var _TraitFall2 = _interopRequireDefault(_TraitFall);

var _TraitWallHitter = require("./TraitWallHitter.js");

var _TraitWallHitter2 = _interopRequireDefault(_TraitWallHitter);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

var _Level = require("./Level.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
	function Input(log) {
		_classCallCheck(this, Input);

		this.left = false;
		this.right = false;
	}

	_createClass(Input, [{
		key: "update",
		value: function update(dt) {}
	}, {
		key: "end",
		value: function end() {}
	}]);

	return Input;
}();

var LogInput = function (_Input) {
	_inherits(LogInput, _Input);

	function LogInput(log) {
		_classCallCheck(this, LogInput);

		var _this = _possibleConstructorReturn(this, (LogInput.__proto__ || Object.getPrototypeOf(LogInput)).call(this));

		_this.log = log;
		_this.time = 0;
		_this.index = 0;
		return _this;
	}

	_createClass(LogInput, [{
		key: "update",
		value: function update(dt) {
			this.left = this.right = false;

			if (this.log.length > this.index) {
				var l = this.log[this.index];

				if (l.time <= this.time) {
					this.left = l.left;
					this.right = l.right;
					this.index += 1;
				}
			}

			this.time += dt;
		}
	}]);

	return LogInput;
}(Input);

var KeyboardInput = function (_Input2) {
	_inherits(KeyboardInput, _Input2);

	function KeyboardInput() {
		_classCallCheck(this, KeyboardInput);

		var _this2 = _possibleConstructorReturn(this, (KeyboardInput.__proto__ || Object.getPrototypeOf(KeyboardInput)).call(this));

		_this2.log = [];
		_this2.time = 0;

		var map = {
			KeyA: "left",
			ArrowLeft: "left",
			KeyD: "right",
			ArrowRight: "right"
		};
		_this2.left = false;
		_this2.right = false;

		function cb(evt) {
			var name = map[evt.code];
			if (!name) return;
			this[name] = evt.type === "keydown";
		}
		_this2._cb = cb.bind(_this2);

		window.addEventListener("keydown", _this2._cb);
		window.addEventListener("keyup", _this2._cb);
		return _this2;
	}

	_createClass(KeyboardInput, [{
		key: "update",
		value: function update(dt) {
			this.log.push({
				time: this.time,
				left: this.left,
				right: this.right
			});
			this.time += dt;
		}
	}, {
		key: "end",
		value: function end() {
			window.removeEventListener("keydown", this._cb);
			window.removeEventListener("keyup", this._cb);
		}
	}]);

	return KeyboardInput;
}(Input);

var EntityPlayer = function (_Entity) {
	_inherits(EntityPlayer, _Entity);

	_createClass(EntityPlayer, [{
		key: "defaults",
		value: function defaults() {
			return { w: 1, h: 1, log: null, lives: 5 };
		}
	}]);

	function EntityPlayer(level, props) {
		_classCallCheck(this, EntityPlayer);

		var _this3 = _possibleConstructorReturn(this, (EntityPlayer.__proto__ || Object.getPrototypeOf(EntityPlayer)).call(this, level, props));

		_this3.tag.wall = true;
		_this3.tag.player = true;

		_this3.startPos = _this3.pos.clone();

		_this3.traitFall = new _TraitFall2.default(_this3);
		_this3.traitWallHitter = new _TraitWallHitter2.default(_this3, function (ent) {
			if (!ent.tag.player) return true;
			return _this3.index < ent.index;
		});

		if (_this3.level.persistent.livesLeft == null) _this3.level.persistent.livesLeft = props.lives;

		if (_this3.level.global.nextIndex == null) _this3.level.global.nextIndex = 1;

		if (props.log) {
			_this3.input = new LogInput(props.log);
			_this3.keyboardControlled = false;
			_this3.index = _this3.level.global.nextIndex++;
		} else {
			_this3.input = new KeyboardInput();
			_this3.keyboardControlled = true;
			_this3.index = 0;
		}

		_this3.pos.y += _this3.index * _this3.bounds.size.y;

		_this3.active = true;
		_this3.groundSpeed = 140;
		_this3.airSpeed = 20;
		_this3.groundFriction = 25;
		_this3.airFriction = 3;
		return _this3;
	}

	_createClass(EntityPlayer, [{
		key: "init",
		value: function init() {
			this.pos.y -= (this.level.global.nextIndex - 1) * this.bounds.size.y;
		}
	}, {
		key: "update",
		value: function update(dt) {
			this.traitFall.update(dt);
			this.input.update(dt);

			var onGround = this.traitWallHitter.collision;
			var fric = onGround ? this.groundFriction : this.airFriction;
			var speed = onGround ? this.groundSpeed : this.airSpeed;

			if (this.active) {
				if (this.input.left) this.velocity.x -= speed * dt;
				if (this.input.right) this.velocity.x += speed * dt;
			}

			var xRatio = 1 / (1 + dt * fric);
			this.velocity.x *= xRatio;

			// Hit enemies
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.level.tags.enemy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var ent = _step.value;

					if (this.bounds.intersects(ent.bounds)) {
						this.die(ent);
						break;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.traitWallHitter.update(dt);
		}
	}, {
		key: "postUpdate",
		value: function postUpdate(dt) {
			_get(EntityPlayer.prototype.__proto__ || Object.getPrototypeOf(EntityPlayer.prototype), "postUpdate", this).call(this, dt);
			this.traitWallHitter.update(dt);
		}
	}, {
		key: "onTriggering",
		value: function onTriggering(ent) {
			if (this.active) this.die(null);
		}
	}, {
		key: "die",
		value: function die(ent) {
			this.active = false;

			if (this.keyboardControlled) {
				this.level.persistent.livesLeft -= 1;
				if (this.level.persistent.livesLeft <= 0) {
					alert("You lose!");
					this.level.init();
					this.level.start();
				} else {
					this.level.spawners.unshift(new _Level.Spawner(EntityPlayer, {
						x: this.startPos.x,
						y: this.startPos.y,
						log: this.input.log
					}));
					this.level.start();
				}
			}
		}
	}, {
		key: "end",
		value: function end() {
			this.input.end();
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			if (this.keyboardControlled) {
				var cam = this.level.camera;
				var can = this.level.can;
				var padding = 100;

				if (this.pos.pixelX < cam.pixelX + padding) cam.pixelX = this.pos.pixelX - padding;else if (this.pos.pixelX > cam.pixelX + can.width - padding - this.bounds.size.pixelX) cam.pixelX = this.pos.pixelX - can.width + padding + this.bounds.size.pixelY;

				if (this.pos.pixelY < cam.pixelY + padding) cam.pixelY = this.pos.pixelY - padding;else if (this.pos.pixelY > cam.pixelY + can.height - padding - this.bounds.size.pixelY) cam.pixelY = this.pos.pixelY - can.height + padding + this.bounds.size.pixelY;
			}

			if (this.keyboardControlled) {
				this.bounds.outline(ctx);
				ctx.fillStyle = _colors2.default.good;
				ctx.fill();

				this.bounds.outline(ctx, 4);
				ctx.fillStyle = _colors2.default.background;
				ctx.fill();

				this.bounds.outline(ctx, 8);
				ctx.fillStyle = _colors2.default.evil;
				ctx.fill();
			} else {
				this.bounds.outline(ctx);
				ctx.fillStyle = _colors2.default.good;
				ctx.fill();

				this.bounds.outline(ctx, 3);
				ctx.fillStyle = _colors2.default.background;
				ctx.fill();

				this.bounds.outline(ctx, 14);
				if (this.active) ctx.fillStyle = _colors2.default.good;else ctx.fillStyle = _colors2.default.evil;
				ctx.fill();
			}
		}
	}, {
		key: "name",
		get: function get() {
			return this.level.global.nextIndex - this.index;
		}
	}]);

	return EntityPlayer;
}(_Entity3.default);

exports.default = EntityPlayer;

},{"./Entity.js":1,"./Level.js":11,"./TraitFall.js":14,"./TraitWallHitter.js":15,"./Vec2.js":16,"./colors.js":18}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntitySpike = function (_Entity) {
	_inherits(EntitySpike, _Entity);

	_createClass(EntitySpike, [{
		key: "defaults",
		value: function defaults() {
			return { w: 0.5, h: 0.7 };
		}
	}]);

	function EntitySpike(level, props) {
		_classCallCheck(this, EntitySpike);

		var _this = _possibleConstructorReturn(this, (EntitySpike.__proto__ || Object.getPrototypeOf(EntitySpike)).call(this, level, props));

		_this.pos.x += 1 - props.w;
		_this.pos.y += 1 - props.h;
		_this.tag.enemy = true;
		return _this;
	}

	_createClass(EntitySpike, [{
		key: "draw",
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.pos.pixelX, this.pos.pixelY + this.bounds.size.pixelY / 2);
			ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX, this.pos.pixelY);
			ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX, this.pos.pixelY + this.bounds.size.pixelY);
			ctx.closePath();
			ctx.fillStyle = _colors2.default.evil;
			ctx.fill();
		}
	}]);

	return EntitySpike;
}(_Entity3.default);

exports.default = EntitySpike;

},{"./Entity.js":1,"./colors.js":18}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityTextBox = function (_Entity) {
	_inherits(EntityTextBox, _Entity);

	_createClass(EntityTextBox, [{
		key: "defaults",
		value: function defaults() {
			return { w: 3, text: "Hello World" };
		}
	}]);

	function EntityTextBox(level, props) {
		_classCallCheck(this, EntityTextBox);

		var _this = _possibleConstructorReturn(this, (EntityTextBox.__proto__ || Object.getPrototypeOf(EntityTextBox)).call(this, level, props));

		_this.text = props.text;
		_this.lines = _this.text.split("\n");
		_this.lineHeight = null;
		_this.textConfigured = false;
		_this.fontSize = 20;
		return _this;
	}

	_createClass(EntityTextBox, [{
		key: "setFont",
		value: function setFont(ctx) {
			ctx.font = this.fontSize + "px monospace";
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			if (!this.textConfigured) {
				ctx.fillStyle = _colors2.default.evil;
				this.setFont(ctx);
				ctx.textBaseline = "hanging";

				var widestLineLen = 0;
				var widestLine = "";
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var line = _step.value;

						var w = ctx.measureText(line).width;
						if (w > widestLineLen) {
							widestLineLen = w;
							widestLine = line;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
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
			ctx.fillStyle = _colors2.default.good;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();

			ctx.fillStyle = _colors2.default.evil;
			this.setFont(ctx);
			ctx.textBaseline = "hanging";

			for (var i in this.lines) {
				ctx.fillText(this.lines[i], this.pos.pixelX + 8, this.pos.pixelY + 10 + this.lineHeight * i);
			}

			// ctx.textBaseline = "bottom";
			// ctx.fillText(this.fontSize, this.pos.pixelX, this.pos.pixelY);
		}
	}]);

	return EntityTextBox;
}(_Entity3.default);

exports.default = EntityTextBox;

},{"./Entity.js":1,"./Vec2.js":16,"./colors.js":18}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityVictory = function (_Entity) {
	_inherits(EntityVictory, _Entity);

	_createClass(EntityVictory, [{
		key: "defaults",
		value: function defaults() {
			return { w: 1, h: 0.4, target: "", action: "" };
		}
	}]);

	function EntityVictory(level, props) {
		_classCallCheck(this, EntityVictory);

		var _this = _possibleConstructorReturn(this, (EntityVictory.__proto__ || Object.getPrototypeOf(EntityVictory)).call(this, level, props));

		_this.target = props.target;
		_this.action = props.action;
		_this.pos.y += 1 - props.h;
		_this.actioning = false;
		return _this;
	}

	_createClass(EntityVictory, [{
		key: "preUpdate",
		value: function preUpdate(dt) {
			this.actioning = false;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.level.lookup(this.target)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var ent = _step.value;

					if (ent.bounds.intersects(this.bounds)) {
						ent.onTriggering(this);
						this.level.triggers[this.action] = true;
						this.actioning = true;
						break;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "outlineThingy",
		value: function outlineThingy(ctx) {
			var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			ctx.beginPath();
			ctx.moveTo(this.pos.pixelX + padding, this.pos.pixelY + this.bounds.size.pixelY);
			ctx.lineTo(this.pos.pixelX + padding, this.pos.pixelY + padding);
			ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX - padding, this.pos.pixelY + padding);
			ctx.lineTo(this.pos.pixelX + this.bounds.size.pixelX - padding, this.pos.pixelY + this.bounds.size.pixelY);
			ctx.closePath();
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			this.bounds.outline(ctx);
			ctx.fillStyle = _colors2.default.good;
			ctx.fill();

			this.outlineThingy(ctx, 4);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();

			this.outlineThingy(ctx, 9);
			if (this.actioning) ctx.fillStyle = _colors2.default.evil;else ctx.fillStyle = _colors2.default.good;
			ctx.fill();
		}
	}]);

	return EntityVictory;
}(_Entity3.default);

exports.default = EntityVictory;

},{"./Entity.js":1,"./Vec2.js":16,"./colors.js":18}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityVictory = function (_Entity) {
	_inherits(EntityVictory, _Entity);

	_createClass(EntityVictory, [{
		key: "defaults",
		value: function defaults() {
			return { d: 1, target: "" };
		}
	}]);

	function EntityVictory(level, props) {
		_classCallCheck(this, EntityVictory);

		var _this = _possibleConstructorReturn(this, (EntityVictory.__proto__ || Object.getPrototypeOf(EntityVictory)).call(this, level, props));

		_this.target = props.target;
		_this.radius = props.d / 2 * _Vec2.default.meter;;
		_this.bounds.size.set(props.d, props.d);
		return _this;
	}

	_createClass(EntityVictory, [{
		key: "preUpdate",
		value: function preUpdate(dt) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.level.lookup(this.target)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var ent = _step.value;

					if (ent.bounds.intersects(this.bounds)) {
						this.level.win();
						return;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "outlineCircle",
		value: function outlineCircle(ctx) {
			var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			ctx.beginPath();
			ctx.arc(this.pos.pixelX + this.radius, this.pos.pixelY + this.radius, this.radius - padding, 0, 2 * Math.PI);
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			this.outlineCircle(ctx, 2);
			ctx.fillStyle = _colors2.default.good;
			ctx.fill();

			this.outlineCircle(ctx, 6);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();

			this.outlineCircle(ctx, 11);
			ctx.fillStyle = _colors2.default.evil;
			ctx.fill();
		}
	}]);

	return EntityVictory;
}(_Entity3.default);

exports.default = EntityVictory;

},{"./Entity.js":1,"./Vec2.js":16,"./colors.js":18}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity.js");

var _Entity3 = _interopRequireDefault(_Entity2);

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityWall = function (_Entity) {
	_inherits(EntityWall, _Entity);

	_createClass(EntityWall, [{
		key: "defaults",
		value: function defaults() {
			return { w: 3, h: 1 };
		}
	}]);

	function EntityWall(level, props) {
		_classCallCheck(this, EntityWall);

		var _this = _possibleConstructorReturn(this, (EntityWall.__proto__ || Object.getPrototypeOf(EntityWall)).call(this, level, props));

		_this.tag.wall = true;
		return _this;
	}

	_createClass(EntityWall, [{
		key: "draw",
		value: function draw(ctx) {
			this.bounds.outline(ctx);
			ctx.fillStyle = _colors2.default.good;
			ctx.fill();

			this.bounds.outline(ctx, 4);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();

			this.bounds.outline(ctx, 8);
			ctx.fillStyle = _colors2.default.evil;
			ctx.fill();

			this.bounds.outline(ctx, 12);
			ctx.fillStyle = _colors2.default.background;
			ctx.fill();
		}
	}]);

	return EntityWall;
}(_Entity3.default);

exports.default = EntityWall;

},{"./Entity.js":1,"./colors.js":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Spawner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require("./colors.js");

var _colors2 = _interopRequireDefault(_colors);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spawner = exports.Spawner = function () {
	function Spawner(cnst, props) {
		_classCallCheck(this, Spawner);

		this.cnst = cnst;
		this.props = props;
	}

	_createClass(Spawner, [{
		key: "clone",
		value: function clone() {
			var props = {};
			for (var i in this.props) {
				props[i] = this.props[i];
			}return new Spawner(this.cnst, props);
		}
	}, {
		key: "create",
		value: function create(level) {
			var ent = new this.cnst(level, this.props);
			ent.spawner = this;
			return ent;
		}
	}]);

	return Spawner;
}();

var Level = function () {
	function Level(can, wincb) {
		_classCallCheck(this, Level);

		this.can = can;
		this.can.style.background = _colors2.default.background;
		this.ctx = this.can.getContext("2d");
		this.wincb = wincb;
	}

	_createClass(Level, [{
		key: "init",
		value: function init() {
			var initialSpawners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.initialSpawners;

			this.pause();
			this.initialSpawners = initialSpawners;
			this.spawners = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.initialSpawners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var s = _step.value;

					this.spawners.push(s.clone());
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.maxPeriod = 1;
			this.updatePeriod = 1 / 60;
			this.timeAcc = 0;
			this.paused = true;
			this.running = false;
			this.won = false;

			this.entities = [];
			this.tags = {};
			this.ids = {};
			this.triggers = {};
			this.persistent = {};
			this.global = {};
			this.camera = new _Vec2.default();

			this.raf = null;
			this.lastTime = null;
			this.boundUpdate = this.update.bind(this);
		}
	}, {
		key: "physics",
		value: function physics(dt) {
			for (var i in this.triggers) {
				this.triggers[i] = false;
			}var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var ent = _step2.value;

					ent.preUpdate(dt);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.entities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _ent = _step3.value;

					_ent._update(dt);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
	}, {
		key: "update",
		value: function update(time) {
			this.running = true;
			if (this.lastTime != null) {
				var dt = (time - this.lastTime) / 1000;

				if (dt <= this.maxPeriod) {
					this.timeAcc += dt;

					// Accumu
					var fixedUpdated = false;
					while (this.timeAcc >= this.updatePeriod) {
						fixedUpdated = true;
						this.physics(this.updatePeriod);
						this.timeAcc -= this.updatePeriod;
					}

					this.ctx.beginPath();
					this.ctx.resetTransform();
					this.ctx.clearRect(0, 0, this.can.width, this.can.height);
					this.ctx.translate(-this.camera.pixelX, -this.camera.pixelY);
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = this.entities[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var ent = _step4.value;

							if (!fixedUpdated) ent._dynamicUpdate(dt);
							this.ctx.save();
							ent._draw(this.ctx);
							this.ctx.restore();
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
				}
			}
			if (this.running && !this.paused) {
				this.lastTime = time;
				this.raf = requestAnimationFrame(this.boundUpdate);
			}
		}
	}, {
		key: "lookup",
		value: function lookup(q) {
			if (typeof q === "string") q = [q];

			var arr = [];
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = q[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var str = _step5.value;

					if (str[0] === "@") {
						if (this.ids[str]) arr.push(this.ids[str]);
					} else {
						var tagged = this.tags[str];
						if (!tagged) {
							console.warn("Unknown tag: " + str);
							continue;
						}
						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;

						try {
							for (var _iterator6 = tagged[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var ent = _step6.value;

								if (ent.tag[str]) arr.push(ent);
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6.return) {
									_iterator6.return();
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6;
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			return arr;
		}
	}, {
		key: "spawn",
		value: function spawn(ent) {
			this.entities.push(ent);
			if (ent.tag.wall) this.tags.wall.push(ent);
			if (ent.tag.enemy) this.tags.enemy.push(ent);
			if (ent.tag.player) this.tags.player.push(ent);
			if (ent.id) this.ids[ent.id] = ent;
		}
	}, {
		key: "pause",
		value: function pause() {
			if (this.paused) return;
			this.paused = true;
			this.running = false;
			cancelAnimationFrame(this.raf);
			this.lastTime = null;
		}
	}, {
		key: "resume",
		value: function resume() {
			if (!this.paused) return;
			this.paused = false;
			this.timeAcc = 0;
			this.update(null);
		}
	}, {
		key: "start",
		value: function start() {
			this.won = false;
			this.pause();

			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {
				for (var _iterator7 = this.entities[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var ent = _step7.value;

					ent.end();
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}

			this.camera.set(0, 0);
			this.tags = {
				wall: [],
				enemy: [],
				player: []
			};
			this.ids = {};
			this.triggers = {};
			this.global = {};
			this.entities = [];
			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;

			try {
				for (var _iterator8 = this.spawners[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					var s = _step8.value;

					this.spawn(s.create(this));
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}

			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;

			try {
				for (var _iterator9 = this.entities[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					var _ent2 = _step9.value;

					_ent2.init();
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}

			this.resume();
		}
	}, {
		key: "win",
		value: function win() {
			if (!this.won) {
				this.wincb();
				this.won = true;
			}
		}
	}]);

	return Level;
}();

exports.default = Level;

},{"./Vec2.js":16,"./colors.js":18}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function () {
	function Rect() {
		var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Vec2.default();
		var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Vec2.default();

		_classCallCheck(this, Rect);

		this.pos = pos;
		this.size = size;
	}

	_createClass(Rect, [{
		key: "draw",
		value: function draw(ctx) {
			this.outline(ctx);
			ctx.stroke();
		}
	}, {
		key: "outline",
		value: function outline(ctx) {
			var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			ctx.beginPath();
			ctx.moveTo(this.pixelLeft + padding, this.pixelTop + padding);
			ctx.lineTo(this.pixelRight - padding, this.pixelTop + padding);
			ctx.lineTo(this.pixelRight - padding, this.pixelBottom - padding);
			ctx.lineTo(this.pixelLeft + padding, this.pixelBottom - padding);
			ctx.closePath();
		}
	}, {
		key: "intersects",
		value: function intersects(other) {
			return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
		}
	}, {
		key: "intersectSide",
		value: function intersectSide(other) {
			if (this.midY - other.bottom >= 0) return "bottom";else if (this.midY - other.top <= 0) return "top";else if (this.midX - other.left <= 0) return "left";else if (this.midX - other.right >= 0) return "right";
		}
	}, {
		key: "contains",
		value: function contains(other) {
			return this.left <= other.left && this.right >= other.right && this.top <= other.top && this.bottom >= other.bottom;
		}
	}, {
		key: "resizeTopTo",
		value: function resizeTopTo(y) {
			var diff = y - this.top;
			this.top = y;
			this.size.y += diff;
		}
	}, {
		key: "pixelResizeTopTo",
		value: function pixelResizeTopTo(y) {
			var diff = y - this.pixelTop;
			this.pixelTop = y;
			this.size.pixelY += diff;
		}
	}, {
		key: "resizeBottomTo",
		value: function resizeBottomTo(y) {
			var diff = y - this.bottom;
			this.size.y += diff;
		}
	}, {
		key: "pixelResizeBottomTo",
		value: function pixelResizeBottomTo(y) {
			var diff = y - this.pixelBottom;
			this.size.pixelY += diff;
		}
	}, {
		key: "resizeLeftTo",
		value: function resizeLeftTo(x) {
			var diff = x - this.left;
			this.left = x;
			this.size.x += diff;
		}
	}, {
		key: "pixelResizeLeftTo",
		value: function pixelResizeLeftTo(x) {
			var diff = x - this.pixelLeft;
			this.pixelLeft = x;
			this.size.pixelX += diff;
		}
	}, {
		key: "resizeRightTo",
		value: function resizeRightTo(x) {
			var diff = x - this.right;
			this.size.x += diff;
		}
	}, {
		key: "pixelResizeRightTo",
		value: function pixelResizeRightTo(x) {
			var diff = x - this.pixelRight;
			this.size.pixelX += diff;
		}
	}, {
		key: "midX",
		get: function get() {
			return this.pos.x + this.size.x / 2;
		}
	}, {
		key: "midY",
		get: function get() {
			return this.pos.y + this.size.y / 2;
		}
	}, {
		key: "top",
		get: function get() {
			return this.pos.y;
		},
		set: function set(n) {
			this.pos.y = n;
		}
	}, {
		key: "pixelTop",
		get: function get() {
			return this.pos.pixelY;
		},
		set: function set(y) {
			this.pos.pixelY = y;
		}
	}, {
		key: "bottom",
		get: function get() {
			return this.pos.y + this.size.y;
		},
		set: function set(y) {
			this.pos.y = y - this.size.y;
		}
	}, {
		key: "pixelBottom",
		get: function get() {
			return this.pos.pixelY + this.size.pixelY;
		},
		set: function set(y) {
			this.pos.pixelY = y + this.size.pixelY;
		}
	}, {
		key: "left",
		get: function get() {
			return this.pos.x;
		},
		set: function set(x) {
			this.pos.x = x;
		}
	}, {
		key: "pixelLeft",
		get: function get() {
			return this.pos.pixelX;
		},
		set: function set(x) {
			this.pos.pixelX = x;
		}
	}, {
		key: "right",
		get: function get() {
			if (this.size.x == Infinity) return Infinity;
			return this.pos.x + this.size.x;
		},
		set: function set(n) {
			this.pos.x = n - this.size.x;
		}
	}, {
		key: "pixelRight",
		get: function get() {
			return this.pos.pixelX + this.size.pixelX;
		},
		set: function set(x) {
			this.pos.pixelX = x + this.size.pixelX;
		}
	}]);

	return Rect;
}();

exports.default = Rect;

},{"./Vec2.js":16}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trait = function () {
	function Trait(ent) {
		_classCallCheck(this, Trait);

		this.entity = ent;
	}

	_createClass(Trait, [{
		key: "update",
		value: function update(dt) {}
	}]);

	return Trait;
}();

exports.default = Trait;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = require("./Trait.js");

var _Trait3 = _interopRequireDefault(_Trait2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraitFall = function (_Trait) {
	_inherits(TraitFall, _Trait);

	function TraitFall(ent) {
		_classCallCheck(this, TraitFall);

		var _this = _possibleConstructorReturn(this, (TraitFall.__proto__ || Object.getPrototypeOf(TraitFall)).call(this, ent));

		_this.gravity = 20;
		return _this;
	}

	_createClass(TraitFall, [{
		key: "update",
		value: function update(dt) {
			this.entity.velocity.y += this.gravity * dt;
		}
	}]);

	return TraitFall;
}(_Trait3.default);

exports.default = TraitFall;

},{"./Trait.js":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = require("./Trait.js");

var _Trait3 = _interopRequireDefault(_Trait2);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraitWallHitter = function (_Trait) {
	_inherits(TraitWallHitter, _Trait);

	function TraitWallHitter(ent, filter) {
		_classCallCheck(this, TraitWallHitter);

		var _this = _possibleConstructorReturn(this, (TraitWallHitter.__proto__ || Object.getPrototypeOf(TraitWallHitter)).call(this, ent));

		_this.filter = filter;
		_this.collision = false;
		_this.onTopOf = null;
		_this.prevOnTopOf = null;
		return _this;
	}

	_createClass(TraitWallHitter, [{
		key: "collide",
		value: function collide(e2) {
			var e1 = this.entity;
			if (!e2.tag.wall) return false;
			if (!e1.bounds.intersects(e2.bounds)) return false;

			var side = e1.bounds.intersectSide(e2.bounds);
			if (this.filter && !this.filter(e2)) {
				return false;
			}

			if (side === "left" && e1.velocity.x > e2.velocity.x) {
				e1.bounds.right = e2.bounds.left;
				e1.velocity.x = e2.velocity.x;
				return true;
			} else if (side === "right" && e1.velocity.x < e2.velocity.x) {
				e1.bounds.left = e2.bounds.right;
				e1.velocity.x = e2.velocity.x;
				return true;
			} else if (side === "top" && e1.velocity.y >= e2.velocity.y) {
				e1.bounds.bottom = e2.bounds.top + 0.001;
				e1.velocity.y = e2.velocity.y;
				this.onTopOf = e2;
				return true;
			}

			return false;
		}
	}, {
		key: "update",
		value: function update(dt) {
			this.prevOnTopOf = this.onTopOf;
			this.collision = false;
			this.onTopOf = null;
			var moved = false;
			var level = this.entity.level;

			do {
				moved = false;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = level.tags.wall[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var ent = _step.value;

						if (this.collide(ent)) {
							this.collision = true;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			} while (moved);

			if (this.onTopOf && !this.prevOnTopOf) {
				this.entity.velocity.sub(this.onTopOf.totalVelocity());
			} else if (!this.onTopOf && this.prevOnTopOf || this.onTopOf != this.prevOnTopOf) {
				this.entity.velocity.add(this.prevOnTopOf.totalVelocity());
				this.onTopOf = null;
			}

			this.entity.relativeTo = this.onTopOf;
		}
	}]);

	return TraitWallHitter;
}(_Trait3.default);

exports.default = TraitWallHitter;

},{"./Trait.js":13,"./Vec2.js":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var meter = 40;

var Vec2 = function () {
	function Vec2() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Vec2);

		this.x = x;
		this.y = y;
	}

	_createClass(Vec2, [{
		key: "set",
		value: function set(x, y) {
			this.x = x;
			this.y = y;
			return this;
		}
	}, {
		key: "add",
		value: function add(vec) {
			this.x += vec.x;
			this.y += vec.y;
			return this;
		}
	}, {
		key: "sub",
		value: function sub(vec) {
			this.x -= vec.x;
			this.y -= vec.y;
			return this;
		}
	}, {
		key: "clone",
		value: function clone() {
			return new Vec2(this.x, this.y);
		}
	}, {
		key: "pixelX",
		get: function get() {
			return Math.floor(this.x * meter);
		},
		set: function set(x) {
			this.x = Math.floor(x) / meter;
		}
	}, {
		key: "pixelY",
		get: function get() {
			return Math.floor(this.y * meter);
		},
		set: function set(y) {
			this.y = Math.floor(y) / meter;
		}
	}]);

	return Vec2;
}();

exports.default = Vec2;


Vec2.zero = new Vec2();
Vec2.meter = meter;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	music: new Audio("assets/music.ogg")
};

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var c1 = "#111111";
var c2 = "#52a784";
var c3 = "#aa5c49";

exports.default = {
	background: "#111111",
	good: "#52a784",
	evil: "#aa5c49"
};

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Level = require("./Level.js");

var _names = require("./names.js");

var _names2 = _interopRequireDefault(_names);

var _Vec = require("./Vec2.js");

var _Vec2 = _interopRequireDefault(_Vec);

var _EntityPlayer = require("./EntityPlayer.js");

var _EntityPlayer2 = _interopRequireDefault(_EntityPlayer);

var _EntityWall = require("./EntityWall.js");

var _EntityWall2 = _interopRequireDefault(_EntityWall);

var _EntityEnemy = require("./EntityEnemy.js");

var _EntityEnemy2 = _interopRequireDefault(_EntityEnemy);

var _EntityDeathZone = require("./EntityDeathZone.js");

var _EntityDeathZone2 = _interopRequireDefault(_EntityDeathZone);

var _EntitySpike = require("./EntitySpike.js");

var _EntitySpike2 = _interopRequireDefault(_EntitySpike);

var _EntityTextBox = require("./EntityTextBox.js");

var _EntityTextBox2 = _interopRequireDefault(_EntityTextBox);

var _EntityVictory = require("./EntityVictory.js");

var _EntityVictory2 = _interopRequireDefault(_EntityVictory);

var _EntityTrigger = require("./EntityTrigger.js");

var _EntityTrigger2 = _interopRequireDefault(_EntityTrigger);

var _EntityBarrier = require("./EntityBarrier.js");

var _EntityBarrier2 = _interopRequireDefault(_EntityBarrier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function level(arr) {
	var spawners = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var entry = _step.value;

			var _entry = _slicedToArray(entry, 2),
			    cnst = _entry[0],
			    props = _entry[1];

			spawners.push(new _Level.Spawner(cnst, props));
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return spawners;
}

exports.default = [level([[_EntityPlayer2.default, { x: 10, y: 10, id: "@player" }], [_EntityDeathZone2.default, {}], [_EntityVictory2.default, { x: 32, y: 10, target: "@player" }], [_EntityWall2.default, { x: 9, y: 11, w: 25 }], [_EntityTextBox2.default, { x: 14, y: 5, w: 15, text: "This is a story...\n" + "A story about my bloodline, and the journey my ancestors\n" + "have travelled to get where we are today.\n" + "Join me, and see how it all started..." }]]), level([[_EntityPlayer2.default, { x: 10, y: 10, id: "@player" }], [_EntityDeathZone2.default, {}], [_EntityVictory2.default, { x: 20, y: 10, target: "@player" }], [_EntityWall2.default, { x: 9, y: 11, w: 5 }], [_EntityWall2.default, { x: 17, y: 11, w: 5 }], [_EntityEnemy2.default, { x: 14, y: 12, w: 3 }], [_EntityTextBox2.default, { x: 12, y: 5, w: 7, text: "Follow " + _names2.default.mainCharacter + "'s path..." }]]), level([[_EntityPlayer2.default, { x: 10, y: 10, id: "@player" }], [_EntityDeathZone2.default, {}], [_EntityWall2.default, { x: 9, y: 11, w: 15 }], [_EntitySpike2.default, { x: 23, y: 10 }], [_EntitySpike2.default, { x: 23, y: 9 }], [_EntitySpike2.default, { x: 23, y: 8 }], [_EntityWall2.default, { x: 24, y: 8, w: 1, h: 3 }], [_EntityVictory2.default, { x: 24, y: 7, target: "@player" }], [_EntityTextBox2.default, { x: 9, y: 5, w: 13, text: "My grandfather used to say, \"The ladder to success\n" + "usually starts with your ancestors at the bottom\".\n" + "I never understood that..." }]]), level([[_EntityPlayer2.default, { x: 10, y: 10, id: "@player" }], [_EntityDeathZone2.default, {}], [_EntityWall2.default, { x: 6, y: 11, w: 5 }], [_EntityWall2.default, { x: 13, y: 15, w: 3 }], [_EntityEnemy2.default, { x: 10, y: 16, w: 3 }], [_EntityWall2.default, { x: 7, y: 15, w: 3 }], [_EntityTrigger2.default, { x: 14, y: 14, target: "player", action: "open" }], [_EntityBarrier2.default, { x: 9, y: 14, h: 1, listen: "open" }], [_EntityVictory2.default, { x: 7, y: 14, target: "@player" }], [_EntityTextBox2.default, { x: 6, y: 5, w: 15, text: _names2.default.mainCharacter + " had two brothers. One was good, but made\n" + "a horrible choice. The other was evil by nature, but made\n" + "the necessary sacrifice in the end." }]]), level([[_EntityPlayer2.default, { x: 5, y: 10, id: "@player", lives: 5 }], [_EntityDeathZone2.default, {}], [_EntityWall2.default, { x: 4, y: 11, w: 5 }], [_EntityWall2.default, { x: 20, y: 9, w: 5 }], [_EntityVictory2.default, { x: 23, y: 8, target: "@player" }], [_EntityTextBox2.default, { x: 4, y: 4, w: 15, text: "\"Life is to short to stop and take a break\"...\n" + "Easy for her to say. She had 5 siblings, no wonder life\n" + "went fast for her... Some would say too fast." }]])];

},{"./EntityBarrier.js":2,"./EntityDeathZone.js":3,"./EntityEnemy.js":4,"./EntityPlayer.js":5,"./EntitySpike.js":6,"./EntityTextBox.js":7,"./EntityTrigger.js":8,"./EntityVictory.js":9,"./EntityWall.js":10,"./Level.js":11,"./Vec2.js":16,"./names.js":21}],20:[function(require,module,exports){
"use strict";

var _Level = require("./Level.js");

var _Level2 = _interopRequireDefault(_Level);

var _assets = require("./assets.js");

var _assets2 = _interopRequireDefault(_assets);

var _levels = require("./levels.js");

var _levels2 = _interopRequireDefault(_levels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("canvas");

//let nextLevel = levels.length - 1;
var nextLevel = 0;
var level = new _Level2.default(canvas, start);
function start() {
	if (nextLevel >= _levels2.default.length) {
		level.pause();
		alert("You won the game.");
	} else {
		level.init(_levels2.default[nextLevel++]);
		level.start();
	}
}
start();

_assets2.default.music.loop = true;
_assets2.default.music.autoplay = true;
_assets2.default.music.volume = 0.4;

// Resize canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

},{"./Level.js":11,"./assets.js":17,"./levels.js":19}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	mainCharacter: "Kyle"
};

},{}]},{},[20]);
