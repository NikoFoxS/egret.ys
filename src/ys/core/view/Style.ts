module ys {
	export class Style {
		public width: number;
		public height: number;
		constructor() {
		}

		Init(target: ys.Component) {
			this.width = target.comp_width;
			this.height = target.comp_height;
			this._target = target;
			this.Style();
		}

		private _target: ys.Component;
		public get owner() {
			return this._target;
		}

		protected Set(d: egret.DisplayObject, style: string, dWidth = 0, dHeight = 0, width: number = this.width, height: number = this.height) {
			ys.Style.layout(d, style, dWidth, dHeight, width, height);
		}

		Style() {
			throw new Error('必须重写Style方法')
		}


		static layout(d: egret.DisplayObject, style: string, dWidth = 0, dHeight = 0, width: number = ys.Context.stageW, height: number = ys.Context.stageH) {
			//left:0;right:0;center:0;top:10,bottom:0;middle:0;ax:0;ay:0;width:100;height:100;scalex:1;scaley:1;

			//w:100;h:100;t:0;l:0;r:0;b:0;cx:0;cy:0
			//ax:0.5;ay:0.5;sx:1;sy:1;ro:0;al:1

			style = style.replace(/,/ig, ';');//逗号分隔
			style = style.replace(/ /ig, ';');//空格分隔
			style = style.replace(/\|/ig, ';');//竖线分隔

			let dwidth = d.width;
			let dheight = d.height;
			if (dWidth != 0) {
				dwidth = dWidth;
			}
			if (dHeight != 0) {
				dheight = dHeight;
			}

			const arr = style.split(';');
			arr.forEach(val => {
				if (val.indexOf(':') != -1) {
					const kvArr = val.split(':');
					const key = kvArr[0];
					const value = +kvArr[1];
					const valueStr = kvArr[1];
					const offsetX = d.anchorOffsetX * d.scaleX;
					const offsetY = d.anchorOffsetY * d.scaleY;

					switch (key) {

						case 'w':
						case 'width':
							d.width = value;
							break;

						case 'h':
						case 'height':
							d.height = value;
							break;

						case 'sx':
							d.scaleX = value;
							break;

						case 'sy':
							d.scaleY = value;
							break;

						case 'ax':
							d.anchorOffsetX = value;
							break;

						case 'ay':
							d.anchorOffsetY = value;
							break;

						case 'x':
						case 'left':
						case 'l':
							d.x = value + offsetX;
							break;

						case 'right':
						case 'r':
							d.x = width - value - dwidth * d.scaleX + offsetX;
							break;

						case 'center':
						case 'c':
							d.x = (width - dwidth * d.scaleX) * 0.5 + value + offsetX;
							break;

						case 'y':
						case 'top':
						case 't':
							d.y = value + offsetY;
							break;

						case 'bottom':
						case 'b':
							d.y = height - value - dheight * d.scaleX + offsetY;
							break;

						case 'middle':
						case 'm':
							d.y = (height - dheight * d.scaleY) * 0.5 + value + offsetY;
							break;

						default:
							console.error('样式错误', key, style);
							break;
					}
				}
			})
		}
	}

}