namespace ys {
	export class UI extends ys.Container {
		public constructor() {
			super();
			this._scripts = [];
			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				//删除脚本
				this.RemoveScript();
				//释放资源
				this.release(this);
				//
				Facade.GET.removeView(this);

			}, this);
			Facade.GET.addView(this);
		}

		private _scripts: ys.Script[];
		public get scripts() {
			return this._scripts;
		}
		/**添加脚本 */
		protected AddScript<T extends ys.Script>(ui: ys.UI, ScriptClass: new () => T, param: any = {}) {
			const sc = new ScriptClass();
			sc.bind(ui);
			sc.Install(param);
			ui.scripts.push(sc);
			console.log('添加脚本',egret.getQualifiedClassName(sc))
		}

		protected RemoveScript() {
			this._scripts.forEach(sc => {
				sc.unbind();
				sc.Uninstall();
				console.log('移除脚本',egret.getQualifiedClassName(sc))
			})
			this._scripts = [];
		}

		/**释放资源到对象池 */
		private release(con: ys.Container) {
			let i = this.numChildren;
			while (i--) {
				let c = this.getChildAt(i);
				if (c instanceof ys.Bitmap) {
					ys.Bitmap.release(c);
				} else if (c instanceof ys.TextField) {
					ys.TextField.release(c);
				} else if (c instanceof ys.Container) {
					this.release(c);
					ys.Container.release(c);
				} else if (c instanceof ys.Shape) {
					ys.Shape.release(c);
				}
			}
		}

		protected createUI(ui: ys.UI) {
			//遍历可枚举的属性
			Object.getOwnPropertyNames(ui).forEach(val => {
				//当前实例的属性
				// console.log(ui, val, ui.hasOwnProperty(val));
				if (ui.hasOwnProperty(val)) {
					if (val.indexOf('bm_') == 0) {
						const res = val.replace('bm_', '');
						const bm = ys.Bitmap.create(res);
						ui.addChild(bm);
						ui[val] = bm;
						console.log('创建', val, bm);
					} else if (val.indexOf('txt_') == 0) {
						const txt = ys.TextField.create();
						ui.addChild(txt);
						ui[val] = txt;
						console.log('创建TextField', val, txt);
					} else if (val.indexOf('shape_') == 0) {
						const s = ys.Shape.create();
						ui.addChild(s);
						ui[val] = s;
						console.log('创建Shape', val, s);
					} else if (val.indexOf('con_') == 0) {
						const con = ys.Container.create();
						ui.addChild(con);
						ui[val] = con;
						console.log('创建Container', val, con);
					} else if (val.indexOf('cl_') == 0) {
						const className = val.replace('cl_', '');
						const MyClass = egret.getDefinitionByName(className);
						const cla = new MyClass();
						ui.addChild(cla);
						ui[val] = cla;
						console.log('创建自定义类', val, cla);
					}
				}
			});
		}

		protected Start() {
			this.createUI(this);
			this.OnStart();
		}

		Init() {
			this.Start();
		}

		OnStart() {

		}

	}
}