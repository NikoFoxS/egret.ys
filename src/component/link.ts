/**
 * 连连看游戏核心逻辑
 */
namespace link {
	export class Tile extends ys.Container {
		constructor(iy, ix, type) {
			super();
			this.ix = ix;
			this.iy = iy;
			this.setType(type);
		}

		private _type: number;
		public get type() {
			return this._type;
		}

		private bm: ys.Bitmap;
		public setType(t, play: boolean = false) {

			this._type = t;
			if (!this.bm) {
				this.bm = new ys.Bitmap();
				this.addChildAt(this.bm, 0);
			}

			if (play) {
				this.bm.texture = RES.getRes(`tt${this.type}_png`);
				this._type = 0;
			} else {
				this.bm.texture = RES.getRes(`t${this.type}_png`);
				// console.log(this.bm.width)
			}

			if (play) {
				this.alpha = 1;
				setTimeout(() => {
					this.alpha = 0;
				}, 300);
			} else {
				if (t == 0) {
					this.alpha = 0;
				}
			}
		}

		public ix;
		public iy;

	}
	export class Logic extends ys.Container {

		public constructor() {
			super();

			this.howTiles = [];

			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.hideView();
			}, this)

		}

		public showView() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
		}

		public showHowPlay() {

		}

		public hideView() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
		}

		public checkLink() {
			let arr = [];
			this.checktTiles.forEach(t => {
				if (t.type != 0) {
					arr.push(t);
				}
			})

			if (arr.length == 0) {
				return;
			}
			const b = this.canLink(arr);
			console.log('可消除', b);
			if (!b) {
				let t: Tile = arr[0];
				let i = arr.length;
				while (i--) {
					const tt: Tile = arr[i];
					if (tt != t && t.type != tt.type) {
						let tp = t.type;
						t.setType(tt.type);// = tt.type;
						tt.setType(tp);// = tp;
					}
				}

				this.checkLink();
			}
		}

		public canLink(arr) {
			let match = false;
			for (let i = 0; i < arr.length; i++) {
				const t1: Tile = arr[i]
				match = false;
				for (let j = i + 1; j < arr.length; j++) {
					const t2: Tile = arr[j];
					// console.log("check", i, j);
					if (t1 != t2 && t1.type != 0 && t2.type != 0 && t1.type == t2.type) {
						const b = this.arithmetic(t1.ix, t1.iy, t2.ix, t2.iy, false);
						if (b) {
							console.log("check ok", t2.type, t1.type);
							match = true;
						}
						break;
					}
				}

				if (match) {
					break;
				}
			}

			return match;
		}

		private tiles: Tile[] = [];
		//线上是这个。
		private checkTile(t: Tile) {
			if (t.type == 0) {
				return;
			}
			t.alpha = 0.5;
			this.tiles.push(t);

			if (this.tiles.length == 2) {
				let t1 = this.tiles[0];
				let t2 = this.tiles[1];
				if (t1.type == t2.type) {
					this.clearType = t1.type;
					const b = this.arithmetic(t1.ix, t1.iy, t2.ix, t2.iy, true);
					if (b) {
						// tb.SoundManager.GET.playSound('sfx_xiao');
					} else {
						// tb.SoundManager.GET.playSound('sfx_click_fail');
					}
					if (b) {
						const tp = t1.type;
						t1.setType(tp, true);
						t2.setType(tp, true);
						this.tiles = [];

						this.dispatchEventWith('game_match', false, tp);

						let pass = this.checkFinsh();
						// console.log('pass????', pass);
						if (pass && this.parent) {
							this.dispatchEventWith('game_pass');
						}
					} else {
						this.tiles.forEach(t => {
							t.alpha = 1;
						})
						this.tiles = [];
					}
				} else {
					// tb.SoundManager.GET.playSound('sfx_click_fail');
					this.tiles.forEach(t => {
						t.alpha = 1;
					})
					this.tiles = [t2];
					t2.alpha = 0.5;
				}

			}
		}

		public howTiles: Tile[];

		//线下用的这个。
		private click(e: egret.TouchEvent) {
			let t = e.target as Tile;
			// console.log('click', t);
			e.stopPropagation();
			if (t.type == 0) {
				return;
			}
			t.alpha = 0.5;
			this.tiles.push(t);
			if (this.tiles.length == 2) {
				let t1 = this.tiles[0];
				let t2 = this.tiles[1];
				if (t1.type == t2.type) {
					this.clearType = t1.type;
					const b = this.arithmetic(t1.ix, t1.iy, t2.ix, t2.iy, true);
					if (b) {
						const tp = t1.type;
						t1.setType(tp, true);
						t2.setType(tp, true);
						this.tiles = [];

						this.dispatchEventWith('game_match', false, tp);

						let pass = this.checkFinsh();
						console.log('pass xxx', pass);
						if (pass && this.parent) {
							this.dispatchEventWith('game_pass');
						}
					} else {
						this.tiles.forEach(t => {
							t.alpha = 1;
						})
						this.tiles = [];
					}
				} else {
					this.tiles.forEach(t => {
						t.alpha = 1;
					})
					this.tiles = [t2];
					t2.alpha = 0.5;
				}

			}
		}

		public arr: number[][] = [
			[1, 1, 0, 0, 2, 2],
			[1, 1, 0, 0, 2, 2],
			[1, 1, 0, 0, 2, 2],
			[1, 1, 0, 0, 2, 2]
		]

		public checkFinsh() {
			let pass = true;
			for (let j = 0; j < this.map.length; j++) {
				for (let i = 0; i < this.map[j].length; i++) {
					const t = this.map[j][i];
					if (t.type != 0) {
						pass = false;
						break;
					}
				}
			}

			return pass;
		}

		private map: Tile[][];
		createMap(arr2: number[][], size) {
			// console.log('??',JSON.stringify(arr));
			let arr = JSON.parse(JSON.stringify(arr2));
			this.removeChildren();
			//补全四周的空位
			const getEmptyArr = (arr: number[]) => {
				let a = arr.slice();
				a.map((el, index) => { a[index] = 0 });
				return a;
			}
			arr.unshift(getEmptyArr(arr[0]));
			arr.push(getEmptyArr(arr[0]));
			arr.forEach(el => {
				el.unshift(0);
				el.push(0);
			});

			this.checktTiles = [];

			//转换为Tile
			const map: Tile[][] = [];
			arr.forEach((val, iy) => {
				map[iy] = [];
				val.forEach((type, ix) => {
					const t = new link.Tile(iy, ix, type);
					map[iy][ix] = t;
					t.x = ix * size;
					t.y = iy * size;
					if (ix == 2 && iy == 3) {
						this.howTiles.push(t);
					} else if (ix == 2 && iy == 4) {
						this.howTiles.push(t);
					}



					this.addChild(t);
					// ys.setAnchor(t, 0.5, 0.5, true)
					t.touchEnabled = true;
					this.checktTiles.push(t);
				})
			})
			console.log(map);
			this.map = map;

			// const r = ys.newRect(this.width,this.height,0xff0000,0,this);
			// r.alpha = 0.5;
		}

		private checktTiles: Tile[]

		/**
		 * 判断二维数组有没有障碍物
		 */
		public isBlocked(x: number, y: number): boolean {
			if (this.map[y][x].type == 0) {
				return false;
			} else {
				return true;
			}
		}
		/**
		 * 水平方向
		 */
		public horizon(x1: number, y1: number, x2: number, y2: number): boolean {
			if (x1 == x2 && y1 == y2) {
				return false;
			}
			if (y1 != y2) {
				return false;
			}

			let start_x = Math.min(x1, x2);
			let end_x = Math.max(x1, x2);

			for (let i = start_x + 1; i < end_x; i++) {
				if (this.isBlocked(i, y1)) {
					return false;
				}
			}
			// console.log('水平方向')
			return true;
		}
		/**
		 * 竖直方向
		 */
		public vertical(x1: number, y1: number, x2: number, y2: number) {
			if (x1 == x2 && y1 == y2) {
				return false;
			}

			if (x1 != x2) {
				return false;
			}

			let start_y = Math.min(y1, y2)
			let end_y = Math.max(y1, y2);

			for (let j = start_y + 1; j < end_y; j++) {
				if (this.isBlocked(x1, j)) {
					return false;
				}
			}
			// console.log('竖直方向')
			return true;
		}
		/**
		 * 一个拐角检测
		 */
		public g_x: number;
		public g_y: number;
		public turn_once(x1: number, y1: number, x2: number, y2: number) {
			if (x1 == x2 && y1 == y2) {
				return false;
			}

			var c_x = x1, c_y = y2;
			var d_x = x2, d_y = y1;

			let c_boo = false;
			let d_boo = false;

			if (!this.isBlocked(c_x, c_y)) {
				if (y1 == c_y) {
					c_boo = this.horizon(x1, y1, c_x, c_y) && this.vertical(c_x, c_y, x2, y2);
				} else {
					c_boo = this.vertical(x1, y1, c_x, c_y) && this.horizon(c_x, c_y, x2, y2);
				}
			}

			if (!this.isBlocked(d_x, d_y)) {
				if (y1 == d_y) {
					d_boo = this.horizon(x1, y1, d_x, d_y) && this.vertical(d_x, d_y, x2, y2);
				} else {
					d_boo = this.vertical(x1, y1, d_x, d_y) && this.horizon(d_x, d_y, x2, y2);
				}

			}
			if (c_boo || d_boo) {
				if (!this.isBlocked(c_x, c_y) && c_boo) {
					this.g_x = c_x;
					this.g_y = c_y;
				} else {
					this.g_x = d_x;
					this.g_y = d_y;
				}
				return true;
			}

			return false;

		}
		/**
		 * 两个拐点检测
		 */
		public turn_twice(x1: number, y1: number, x2: number, y2: number) {
			if (x1 == x2 && y1 == y2) {
				return false;
			}
			let MAX_X = this.map[0].length - 1;
			let MAX_Y = this.map.length - 1;

			for (let i = x1; i >= 0; i--) {
				for (let j = y1; j >= 0; j--) {
					if ((i == x1 && j == y1) || (i == x2 && j == y2)) {
						continue;
					}
					if (this.isBlocked(i, j)) {
						continue;
					}
					if (this.turn_once(x1, y1, i, j) && (this.horizon(i, j, x2, y2) || this.vertical(i, j, x2, y2))) {
						this.createLine(x2, y2, i, j, this.g_x, this.g_y, x1, y1)
						return true;
					}
					if (this.turn_once(i, j, x2, y2) && (this.horizon(x1, y1, i, j) || this.vertical(x1, y1, i, j))) {
						this.createLine(x1, y1, i, j, this.g_x, this.g_y, x2, y2)
						return true;
					}

				}

				for (let j = y1; j <= MAX_Y; j++) {
					if ((i == x1 && j == y1) || (i == x2 && j == y2)) {
						continue;
					}
					if (this.isBlocked(i, j)) {
						continue;
					}
					if (this.turn_once(x1, y1, i, j) && (this.horizon(i, j, x2, y2) || this.vertical(i, j, x2, y2))) {
						this.createLine(x2, y2, i, j, this.g_x, this.g_y, x1, y1)
						return true;
					}
					if (this.turn_once(i, j, x2, y2) && (this.horizon(x1, y1, i, j) || this.vertical(x1, y1, i, j))) {
						this.createLine(x1, y1, i, j, this.g_x, this.g_y, x2, y2)
						return true;
					}

				}
			}

			for (let i = x1; i <= MAX_X; i++) {

				for (let j = y1; j >= 0; j--) {
					if ((i == x1 && j == y1) || (i == x2 && j == y2)) {
						continue;
					}
					if (this.isBlocked(i, j)) {
						continue;
					}
					if (this.turn_once(x1, y1, i, j) && (this.horizon(i, j, x2, y2) || this.vertical(i, j, x2, y2))) {
						this.createLine(x2, y2, i, j, this.g_x, this.g_y, x1, y1)
						return true;
					}
					if (this.turn_once(i, j, x2, y2) && (this.horizon(x1, y1, i, j) || this.vertical(x1, y1, i, j))) {
						this.createLine(x1, y1, i, j, this.g_x, this.g_y, x2, y2)
						return true;
					}

				}

				for (let j = y1; j <= MAX_Y; j++) {
					if ((i == x1 && j == y1) || (i == x2 && j == y2)) {
						continue;
					}
					if (this.isBlocked(i, j)) {
						continue;
					}
					if (this.turn_once(x1, y1, i, j) && (this.horizon(i, j, x2, y2) || this.vertical(i, j, x2, y2))) {
						this.createLine(x2, y2, i, j, this.g_x, this.g_y, x1, y1)
						return true;
					}
					if (this.turn_once(i, j, x2, y2) && (this.horizon(x1, y1, i, j) || this.vertical(x1, y1, i, j))) {
						this.createLine(x1, y1, i, j, this.g_x, this.g_y, x2, y2)
						return true;
					}

				}
			}

			// for (let i = 0; i <= MAX_X; i++) {
			// 	for (let j = 0; j <= MAX_Y; j++) {
			// 		if ((i == x1 && j == y1) || (i == x2 && j == y2)) {
			// 			continue;
			// 		}
			// 		if (this.isBlocked(i, j)) {
			// 			continue;
			// 		}
			// 		if (this.turn_once(x1, y1, i, j) && (this.horizon(i, j, x2, y2) || this.vertical(i, j, x2, y2))) {
			// 			this.createLine(x2, y2, i, j, this.g_x, this.g_y, x1, y1)
			// 			return true;
			// 		}
			// 		if (this.turn_once(i, j, x2, y2) && (this.horizon(x1, y1, i, j) || this.vertical(x1, y1, i, j))) {
			// 			this.createLine(x1, y1, i, j, this.g_x, this.g_y, x2, y2)
			// 			return true;
			// 		}

			// 	}
			// }

			return false;
		}
		//连接线
		// public line: egret.Shape;

		/**
		 * 消除算法
		 */
		private drawLine: boolean;
		public arithmetic(x1, y1, x2, y2, draw): boolean {
			this.drawLine = draw;
			let ret = false;
			//水平方向
			ret = this.horizon(x1, y1, x2, y2);
			if (ret) {
				this.createLine(x1, y1, x2, y2);
				return true;
			}
			//竖直方向
			ret = this.vertical(x1, y1, x2, y2);
			if (ret) {
				this.createLine(x1, y1, x2, y2);
				return true;
			}
			//一个拐点检测
			ret = this.turn_once(x1, y1, x2, y2);
			if (ret) {
				this.createLine(x1, y1, this.g_x, this.g_y, x2, y2);
				return true;
			}
			//两个拐点检测
			ret = this.turn_twice(x1, y1, x2, y2);
			if (ret) {
				return true;
			}
			return false;
		}

		/**
		 * 创建链接线
		 */
		private clearType: number;
		public createLine(...num: number[]): void {
			if (this.drawLine) {
				const line = new egret.Shape();
				// if (CONFIG.shop == 'nike' || CONFIG.shop == 'kids') {
				// 	this.nikeLine(line, num);
				// }
				// else if (CONFIG.shop == 'jordan') {
				// 	this.jordanLine(line, num);
				// }

				this.addChildAt(line, 0);
				// this.addChild(line);
				if (line.parent) {
					setTimeout(() => {
						ys.removeDisplayObject(line);
					}, 300, this)
				}
			}

		}

		private kidsLine(line: egret.Shape, num: number[]) {
			let color = 0x000000;
			line.graphics.lineStyle(10, color);
			line.graphics.moveTo(this.setPos(num[0]), this.setPos(num[1]));
			line.graphics.lineTo(this.setPos(num[2]), this.setPos(num[3]));
			if (num.length == 6) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
			} else if (num.length == 8) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
				line.graphics.lineTo(this.setPos(num[6]), this.setPos(num[7]));
			}

			color = 0xffff00

			line.graphics.lineStyle(5, color);
			line.graphics.moveTo(this.setPos(num[0]), this.setPos(num[1]));
			line.graphics.lineTo(this.setPos(num[2]), this.setPos(num[3]));
			if (num.length == 6) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
			} else if (num.length == 8) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
				line.graphics.lineTo(this.setPos(num[6]), this.setPos(num[7]));
			}
		}

		private jordanLine(line: egret.Shape, num: number[]) {
			let color = 0x000000;
			line.graphics.lineStyle(6, color);
			line.graphics.moveTo(this.setPos(num[0]), this.setPos(num[1]));
			line.graphics.lineTo(this.setPos(num[2]), this.setPos(num[3]));
			if (num.length == 6) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
			} else if (num.length == 8) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
				line.graphics.lineTo(this.setPos(num[6]), this.setPos(num[7]));
			}
		}

		private nikeLine(line: egret.Shape, num: number[]) {
			//0xe635f5 紫色
			//0xf0ff06 黄色
			//0x2a2ffa 蓝色
			//0x43fd5c 绿色
			//0xebebeb 白色

			// const colors = [0xe635f5, 0xe635f5, 0xf0ff06, 0xf0ff06, 0x2a2ffa, 0x2a2ffa, 0x2a2ffa, 0x43fd5c, 0x43fd5c, 0xebebeb, 0xebebeb, 0xebebeb];
			let colors;
			// if (CONFIG.shop == 'nike' || CONFIG.shop == 'kids') {
			colors = [
				0x2c2d9d,
				0xa578ef,
				0x191919,
				0xf0ff05,
				0xf0ff05,
				0xf0ff05,
				0x2c2d9d,
				0x2c2d9d,
				0x2c2d9d,//
				0xa578ef,
				0x191919,
				0xf0ff05,
				0xf0ff05,
				0x2c2d9d//
			];
			// }
			const color = colors[this.clearType - 1];

			line.graphics.lineStyle(5, color);
			line.graphics.moveTo(this.setPos(num[0]), this.setPos(num[1]));
			line.graphics.lineTo(this.setPos(num[2]), this.setPos(num[3]));
			if (num.length == 6) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
			} else if (num.length == 8) {
				line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
				line.graphics.lineTo(this.setPos(num[6]), this.setPos(num[7]));
			}
		}

		public setPos(num: number): number {
			const size = 85;
			return 100 * num + size * 0.5;
		}

	}
}

