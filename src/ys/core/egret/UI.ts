namespace ys {
	export class UI extends ys.Container {

		constructor() {
			super();
		}

		public data: any = {};

		public get ui() {
			return this._ui;
		}
		private _ui;

		Anchor(d: egret.DisplayObject, ax = 0.5, ay = 0.5, fix = false) {
			const anx = d.anchorOffsetX;
			const any = d.anchorOffsetY;
			if (ax <= 1) {
				d.anchorOffsetX = d.width * ax;
			} else {
				d.anchorOffsetX = ax;
			}
			if (ay <= 1) {
				d.anchorOffsetY = d.height * ay;
			} else {
				d.anchorOffsetY = ay;
			}

			//fix=true 修改锚点但是位置不变
			if (d.parent && fix) {
				d.x += (d.anchorOffsetX - anx) * d.scaleX;
				d.y += (d.anchorOffsetY - any) * d.scaleY;
			}

		}

		Style(d: egret.DisplayObject, style: string, width = ys.Context.stageW, height = ys.Context.stageH) {
			//left:0;right:0;center:0;top:10,bottom:0;middle:0;ax:0;ay:0;width:100;height:100;scalex:1;scaley:1;
			style = style.replace(/,/ig, ';');//逗号分隔
			style = style.replace(/ /ig, ';');//空格分隔
			style = style.replace(/\|/ig, ';');//竖线分隔
			const arr = style.split(';');
			arr.forEach(val => {
				if (val.indexOf(':') != -1) {
					const kvArr = val.split(':');
					const key = kvArr[0];
					const value = +kvArr[1];
					const offsetX = d.anchorOffsetX * d.scaleX;
					const offsetY = d.anchorOffsetY * d.scaleY;
					console.log(key, value);
					switch (key) {
						case 'left':
						case 'l':
							d.x = value + offsetX;
							break;

						case 'right':
						case 'r':
							d.x = width - value - d.width * d.scaleX + offsetX;
							break;

						case 'center':
						case 'c':
							d.x = (width - d.width * d.scaleX) * 0.5 + value + offsetX;
							break;

						case 'top':
						case 't':
							d.y = value + offsetY;
							break;

						case 'bottom':
						case 'b':
							d.y = height - value - d.height * d.scaleX + offsetY;
							break;

						case 'middle':
						case 'm':
							d.y = (height - d.height * d.scaleY) * 0.5 + value + offsetY;
							break;

						default:
							console.error('样式错误', key, style);
							break;
					}
				}
			})
		}

		CreateDisplayObject(UIclass) {
			const layout = new UIclass();
			this._ui = layout;
			const arr = Object.getOwnPropertyNames(layout);
			arr.forEach(val => {
				if (val.indexOf('bm_') == 0) {
					console.log('new', val)
					const res = val.replace('bm_', '');
					const bm = ys.Bitmap.create();
					this.addChild(bm);
					layout[val] = bm;
				} else if (val.indexOf('txt_') == 0) {
					const txt = ys.TextField.create();
					this.addChild(txt);
					layout[val] = txt;
				} else if (val.indexOf('input_') == 0) {
					const input = ys.TextInput.create();
					this.addChild(input);
					layout[val] = input;
				} else if (val.indexOf('shape_') == 0) {
					const s = ys.Shape.create();
					this.addChild(s);
					layout[val] = s;
				} else if (val.indexOf('con_') == 0) {
					const con = ys.Container.create();
					this.addChild(con);
					layout[val] = con;
				} else if (val.indexOf('mc_') == 0) {
					const mc = ys.MovieClip.create();
					this.addChild(mc);
					layout[val] = mc;
				} else if (val.indexOf('cl_') == 0) {
					//暂时不处理，自定义类。
				}
			})
			this.Layout();
		}

		Layout() {

		}

		Script(ScriptClass) {
			const script = new ScriptClass() as ys.Script;
			script.Bind(this, this.data);
		}

		async Start() {

		}

	}
}