module ys {
	export class IconSelect extends egret.DisplayObjectContainer {
		/**
		 * @param icons 资源数组
		 * @param space icon与icon的距离。注意：是两个x坐标之间的距离。
		 */
		public constructor(icons: string[], space: number, loop: boolean = false) {
			super();

			this.iconsCon = new egret.DisplayObjectContainer();
			this.addChild(this.iconsCon);

			let i = 0;
			let len = icons.length;
			while (i < len) {
				let icon = new Icon(icons[i]);
				if (i > 0) {
					icon.x = space * i;
				}
				icon.index = i;
				// icon.txt.text = 'icon' + i;
				// icon.id = i;
				icon.touchEnabled = true;
				this.iconsCon.addChild(icon);
				i++;
			}
			this.space = space;
			this.loop = loop;
			this.updateScale();
			this.index = 0;
			this.checkSelect();

			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTap, this);
			}, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTap, this);
			}, this);
		}
		//选中的icon的放大比例
		public static scale: number = 1.2;
		//默认缩放
		public static scaleDefault: number = 1;
		//当缓动结束，选择某一个icon
		public static SELECT_ONE: string = 'select_one_icon';
		//当点击某一个icon
		public static CLICK_ONE: string = 'click_one_icon';
		//icon开始移动
		public static MOVE_START: string = 'icon_move_start';

		private loop: boolean;
		private iconsCon: egret.DisplayObjectContainer;
		private space: number;
		private index: number;
		private isTween: boolean;
		private tweenTime: number;

		private checkTap(e: egret.TouchEvent) {
			let icon = <Icon>e.target;
			let index = this.getMoveIndex(icon);
			this._moveIndex = index;
			this.dispatchEventWith(ys.IconSelect.CLICK_ONE, false, { moveIndex: index });
		}
		/**
		 * 选择的icon的index
		 */
		public get selectIndex() {
			let i = this.iconsCon.numChildren;
			let index = 0;
			while (i--) {
				let icon = <Icon>this.iconsCon.getChildAt(i);
				let p = icon.localToGlobal();
				p = this.globalToLocal(p.x, p.y);
				if (p.x == 0) {
					index = icon.index;
					break;
				}
			}
			return index;
		}

		private _selectIndex: number;
		private checkSelect() {
			let i = this.iconsCon.numChildren;
			let index = 0;
			while (i--) {
				let icon = <Icon>this.iconsCon.getChildAt(i);
				let p = icon.localToGlobal();
				p = this.globalToLocal(p.x, p.y);
				if (p.x == 0) {
					index = icon.index;
					break;
				}
			}
			this.dispatchEventWith(ys.IconSelect.SELECT_ONE, false, { index: index });
		}

		private checkLoop(idx) {
			let i = this.iconsCon.numChildren;
			let dis = this.space * this.iconsCon.numChildren;
			while (i--) {
				let icon = <Icon>this.iconsCon.getChildAt(i);
				let p = icon.localToGlobal();
				p = this.globalToLocal(p.x, p.y);
				if (idx < 0) {
					if (p.x < - this.space) {
						icon.x += dis;
					}
				} else if (idx > 0) {
					if (p.x >= dis - this.space) {
						icon.x -= dis;
					}
				}
			}
		}

		public getMoveIndex(icon) {
			let i = this.iconsCon.numChildren;
			let index = 0;
			let p = icon.localToGlobal();
			p = this.globalToLocal(p.x, p.y);
			return Math.floor(p.x / this.space);
		}

		private _moveIndex: number;
		public get moveIndex() {
			return this._moveIndex;
		}
		/**
		 *@param index 向左或者向右移动index个元素。如：1右移1个。-1就是左移1个。
		 @param time 移动需要的时间
		 */
		public move(index, time = 0) {
			let idx = this.index;
			idx += index;

			if (!this.loop && (idx < -this.iconsCon.numChildren + 1 || idx > 0)) {
				return;
			}
			if (this.isTween) {
				return;
			}

			this.dispatchEventWith(ys.IconSelect.MOVE_START);

			this.index = idx;

			this.isTween = true;
			egret.Tween.get(this.iconsCon, {
				onChange: () => {
					this.updateScale();
				}
			})
				.to({ x: this.iconsCon.x + index * (this.space) }, time).call(() => {
					this.isTween = false;
					this.checkSelect();
					if (this.loop) {
						this.checkLoop(index);
					}

				});
		}

		public updateScale() {
			let i = this.iconsCon.numChildren;
			while (i--) {
				let scaleDefault = ys.IconSelect.scaleDefault;
				let icon = this.iconsCon.getChildAt(i);
				let pt = icon.localToGlobal();
				pt = this.globalToLocal(pt.x, pt.y);
				let scale = (scaleDefault - Math.abs(pt.x) / (this.space)) * (IconSelect.scale - scaleDefault) + scaleDefault;
				if (scale < scaleDefault) {
					scale = scaleDefault;
				}
				icon.scaleX = icon.scaleY = scale;
			}
		}
	}

	class Icon extends egret.DisplayObjectContainer {
		constructor(res: string) {
			super();
			let bm = new egret.Bitmap(RES.getRes(res));
			bm.anchorOffsetX = bm.width * 0.5;
			bm.anchorOffsetY = bm.height * 0.5;
			this.addChild(bm);
			this.width = bm.width;
			this.height = bm.height;

		}
		public index: number;

	}
}
