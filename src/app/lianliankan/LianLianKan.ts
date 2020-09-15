module ys {
	export class LianLianKan {

		private _xcount: number;
		private _ycount: number;
		public constructor() {
		}

		create(xCount, yCount) {
			this._xcount = xCount;
			this._ycount = yCount;
			var sub = -1;
			let arr = [];
			for (let j = 0; j < yCount; j++) {
				arr[j] = new Array();
				for (let i = 0; i < xCount; i++) {
					//判断是不是最外层
					if (i > 0 && i < xCount - 1 && j > 0 && j < yCount - 1) {
						sub++;
						/*每循环一次下标加1*/
						var dogName: number = arr[sub];
						var txtr: egret.Texture = RES.getRes("material_json#y" + dogName);
						var img: egret.Bitmap = new egret.Bitmap(txtr);
						img.x = 80 * i;
						img.y = 80 * j;
						arr[j][i] = img;
						arr[j][i].touchEnabled = true;
					} else {
						arr[j][i] = null;
						// console.log(i + "------" + j + "----------------");
					}

				}
			}
		}

		public 

		/**
		 * 判断二维数组有没有障碍物
		 */
		public isBlocked(x: number, y: number): boolean {
			// if (!SceneCtrl.instance.Arr_erwei[y][x]) {
			// 	return false;
			// } else {
			// 	return true;
			// }
			return
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
			let MAX_X = 7;
			let MAX_Y = 7;
			for (let i = 0; i <= MAX_X; i++) {
				for (let j = 0; j <= MAX_Y; j++) {
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

			return false;
		}
		//连接线
		public line: egret.Shape;

		/**
		 * 消除算法
		 */
		public arithmetic(x1, y1, x2, y2): boolean {
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
		public createLine(...num: number[]): void {
			this.line = new egret.Shape();
			this.line.graphics.lineStyle(5, 0xff0000);
			this.line.graphics.moveTo(this.setPos(num[0]), this.setPos(num[1]));
			this.line.graphics.lineTo(this.setPos(num[2]), this.setPos(num[3]));
			if (num.length == 6) {
				this.line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
			} else if (num.length == 8) {
				this.line.graphics.lineTo(this.setPos(num[4]), this.setPos(num[5]));
				this.line.graphics.lineTo(this.setPos(num[6]), this.setPos(num[7]));
			}
			this.line.graphics.endFill();
			// SceneCtrl.instance.stage.addChild(this.line);
			if (this.line.parent) {
				setTimeout(() => {
					// SceneCtrl.instance.stage.removeChild(this.line);
				}, 300, this)
			}
		}
		public setPos(num: number): number {
			return 30 + 80 * num;
		}

	}
}

