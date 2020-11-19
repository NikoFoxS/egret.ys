module ys {
	export class Swiper extends egret.DisplayObjectContainer {
		/**
		 * @param items 显示对象数组
		 * @param space icon与icon的距离。注意：是两个x坐标之间的距离。
		 */
		public constructor() {
			super();

			this.iconsCon = new egret.DisplayObjectContainer();
			this.addChild(this.iconsCon);

			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTap, this);
			}, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTap, this);
			}, this);
		}

		public show(items: egret.DisplayObject[], space: number, loop: boolean = false) {
			this.iconsCon.removeChildren();
			
			items.forEach((item, index) => {
				item['index'] = index;
				if (index > 0) {
					item.x = space * index;
				}
				item.touchEnabled = true;
				this.iconsCon.addChild(item);
			})

			this.space = space;
			this.loop = loop;
			this.updateScale();
			this.index = 0;
			this.checkSelect();
		}

		//选中的icon的放大比例
		public static scaleSelect: number = 1.2;
		public static scaleDefault: number = 1.0;
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
			let icon = <any>e.target;
			let index = this.getMoveIndex(icon);
			this._moveIndex = index;
			this.dispatchEventWith(ys.Swiper.CLICK_ONE, false, { moveIndex: index });
		}
		/**
		 * 选择的icon的index
		 */
		public get selectIndex() {
			let i = this.iconsCon.numChildren;
			let index = 0;
			while (i--) {
				let icon = <any>this.iconsCon.getChildAt(i);
				let p = icon.localToGlobal(icon.anchorOffsetX,icon.anchorOffsetY);
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
			let index = this.selectIndex;
			this.dispatchEventWith(ys.Swiper.SELECT_ONE, false, { index: index });
		}

		private checkLoop(idx) {
			let i = this.iconsCon.numChildren;
			let dis = this.space * this.iconsCon.numChildren;
			while (i--) {
				let icon = this.iconsCon.getChildAt(i);
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

			this.dispatchEventWith(ys.Swiper.MOVE_START);

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
			let scaleDefault = ys.Swiper.scaleDefault;
			let scaleSelect = ys.Swiper.scaleSelect;
			while (i--) {
				let icon = this.iconsCon.getChildAt(i);
				let pt = icon.localToGlobal(icon.anchorOffsetX, icon.anchorOffsetY);
				pt = this.globalToLocal(pt.x, pt.y);

				let scale = (1 - Math.abs(pt.x) / (this.space)) * (scaleSelect - scaleDefault) + scaleDefault;
				if (scale < scaleDefault) {
					scale = scaleDefault;
				}
				icon.scaleX = icon.scaleY = scale;
				icon['update'] && icon['update']();
			}
		}
	}

}
