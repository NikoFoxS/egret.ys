namespace ys {

	export class UIView {
	}

	export class UIStyle {
		Init(view) {
			throw new Error('必须重写Init')
		}
	}

	export class UI extends ys.Container {
		public data: any;

		private _view;
		public get view() {
			return this._view;
		}

		private _style;
		public get style() {
			return this._style;
		}

		async LoadGroup(group: string, loadingTip: string = '') {
			if (group != '') {
				loadingTip.length && ys.showLoading(loadingTip);
				await RES.loadGroup(group);
				loadingTip.length && ys.hideLoading();
			}
		}

		InitView(UIViewClass) {
			const ui = new UIViewClass() as UIView;
			//实例化显示对象
			for (let val in ui) {
				if (val.indexOf('bm_') == 0) {
					const res = val.replace('bm_', '');
					const bm = ys.Bitmap.create(res);
					this.addChild(bm);
					ui[val] = bm;
					console.log('', RES.getRes(res))
				} else if (val.indexOf('txt_') == 0) {
					const txt = ys.TextField.create();
					this.addChild(txt);
					ui[val] = txt;
				} else if (val.indexOf('shape_') == 0) {
					const s = ys.Shape.create();
					this.addChild(s);
					ui[val] = s;
				} else if (val.indexOf('con_') == 0) {
					const con = ys.Container.create();
					this.addChild(con);
					ui[val] = con;
				} else if (val.indexOf('class_') == 0) {
					const className = val.replace('class_', '');
					const MyClass = egret.getDefinitionByName(className);
					const cla = new MyClass();
					this.addChild(cla);
					ui[val] = cla;
				}
			}
			this._view = ui;
		}

		InitStyle(UIStyleClass) {
			const style = new UIStyleClass() as UIStyle;
			style.Init(this.view);
			this._style = style;
		}

		InitScript(ScriptClass: any, param?: any) {
			const sc = new ScriptClass() as ys.Script;
			sc.bind(this);
			sc.Install(param);
			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				sc.unbind();
				sc.Uninstall();
			}, this);
		}

		Start(param?: any) {

		}

	}
}