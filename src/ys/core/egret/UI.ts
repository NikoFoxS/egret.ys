namespace ys {

	export class UILayout {

		/**
		 * 绑定layout布局到容器ui
		 */
		static BindView(layout: UILayout, ui: ys.Container) {
			//实例化显示对象
			const arr = Object.getOwnPropertyNames(layout);
			arr.forEach(val => {
				if (val.indexOf('bm_') == 0) {
					const res = val.replace('bm_', '');
					const bm = ys.Bitmap.create(res);
					ui.addChild(bm);
					layout[val] = bm;
				} else if (val.indexOf('txt_') == 0) {
					const txt = ys.TextField.create();
					ui.addChild(txt);
					layout[val] = txt;
				} else if (val.indexOf('input_') == 0) {
					const input = ys.TextInput.create();
					ui.addChild(input);
					layout[val] = input;
				} else if (val.indexOf('shape_') == 0) {
					const s = ys.Shape.create();
					ui.addChild(s);
					layout[val] = s;
				} else if (val.indexOf('con_') == 0) {
					const con = ys.Container.create();
					ui.addChild(con);
					layout[val] = con;
				} else if (val.indexOf('mc_') == 0) {
					const mc = ys.MovieClip.create();
					ui.addChild(mc);
					layout[val] = mc;
				} else if (val.indexOf('cl_') == 0) {
					// const className = val.replace('cl_', '');
					// const MyClass = egret.getDefinitionByName(className);
					// const cla = new MyClass();
					// ui.addChild(cla);
					// this[val] = cla;
				}
			})
		}

		bindScript(target: egret.DisplayObject, ScriptClass, data: any) {
			const sc = new ScriptClass() as ys.Script;
			sc.Bind(target, data);
			target.once(egret.Event.REMOVED_FROM_STAGE, () => {
				sc.Unbind();
			}, this);
		}

		scale(d:egret.DisplayObject,scaleX,scaleY?)
		{
			if(scaleY)
			{
				d.scaleX = scaleX;
				d.scaleY = scaleY;
			}else
			{
				d.scaleX = d.scaleY = scaleX;
			}
		}

		anchor(d: egret.DisplayObject, ax = 0.5, ay = 0.5, fix = false) {
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

		layout(d: egret.DisplayObject, style: string, width = ys.Context.STAGE_W, height = ys.Context.STAGE_H) {
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

		async OnCreate(data?: any) {

		}

	}

	export class UIScript extends ys.Script implements ys.IObserver {
		constructor() {
			super();
			this.invoker = new ys.Invoker();
		}

		protected invoker: ys.Invoker;

		ListInvoke(): any[] {
			return [];
		}

		OnInvoke(handler: number, data?: any): void {

		}

		OnRegister(data?: any) {

		}

		OnRemove() {

		}

	}

	export class UI extends ys.Container {

		constructor() {
			super();
		}

		async Start(data?: any) {

		}

		async setup(LayoutClass, ScriptClass, data?: any) {
			//布局
			const layout = new LayoutClass() as ys.UILayout;
			UILayout.BindView(layout, this);
			await layout.OnCreate(data);

			const script = new ScriptClass() as ys.UIScript;
			script.Bind(layout, data);

		}

	}
}