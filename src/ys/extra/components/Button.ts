module ys {

	class ButtonBase extends egret.DisplayObjectContainer {
		constructor() {
			super();
		}

		protected bg: egret.DisplayObject;
		private _label: ys.TextField;
		/**
		 * @param t 字符
		 * @param size 字体大小
		 * @param color 字体颜色
		 * @param offsetWidth 宽度缩小多少。主要处理不规范的按钮底图
		 * @param offsetX x方向偏移多少。主要处理不规范的按钮底图
		 * @param offsetY y方向偏移多少。主要处理不规范的按钮底图
		 */
		public setLabel(t: string, size: number, color: number, offsetWidth = 0, offsetX = 0, offsetY = 0) {
			if (this.bg) {
				if (!this._label) {
					this._label = new ys.TextField();
					this.addChild(this._label);
				}
				let label = this._label;
				label.text = t;
				label.textColor = color;
				label.size = size;
				label.width = label.textWidth;
				label.height = label.textHeight;
				label.textAlign = 'center';
				label.anchorOffsetX = label.width * 0.5;
				label.anchorOffsetY = label.height * 0.5;
				let scale = 1;
				const w = this.bg.width - offsetWidth;
				//固定宽度
				if (label.textWidth > w) {
					scale = w / label.textWidth;
				}
				label.scaleX = label.scaleY = scale;
				label.x = this.bg.width * 0.5 + offsetX;
				label.y = this.bg.height * 0.5 + offsetY;

				label.verticalAlign = egret.VerticalAlign.MIDDLE;

			}

			this.cacheAsBitmap = true;
		}


	}

	export interface ButtonTouchEffect {
		onTouchBeginEffect(btn: ys.Button);

		onTouchEndEffect(btn: ys.Button);
	}

	export class Button extends ButtonBase {
		public constructor(res: string) {
			super();
			var bg = ys.newBitmap(res, this);
			this.bg = bg;
		}

		public setSize(w, scale9?) {
			let bg = <egret.Bitmap>this.bg;
			if (w != 0) {
				bg.width = w;
				if (scale9) {
					bg.scale9Grid = scale9;
				}
			}
		}

		public set effect(ef) {
			ef ? (this.enableEffect()) : (this.removeEffect());
			this._touchEffect = ef;
		}

		private _touchEffect: ys.ButtonTouchEffect

		private enableEffect() {
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkEffect, this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkEffect, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.checkEffect, this);
		}

		private removeEffect() {
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkEffect, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkEffect, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.checkEffect, this);
		}

		private checkEffect(e: egret.TouchEvent) {
			let ef = this._touchEffect;
			if (ef) {
				let type = e.type;
				switch (type) {
					case egret.TouchEvent.TOUCH_BEGIN:
						ef.onTouchBeginEffect(this);
						break;
					default:
						ef.onTouchEndEffect(this);
						break;
				}
			}

		}

	}
}