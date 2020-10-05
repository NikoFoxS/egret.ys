namespace ys {
	export class View {
		public constructor() {
			this.view = [];
			this.scripts = [];
		}

		private view: ys.UI[];
		private scripts: ys.Script[];

		addView(ui: ys.UI) {
			this.view.push(ui);
		}

		removeView(ui: ys.UI) {
			let i = this.view.length;
			let u: ys.UI;
			while (i--) {
				u = this.view[i];
				if (u == ui) {
					this.view.splice(i, 1);
				}
			}
		}

		addScript(script: ys.Script) {
			this.scripts.push(script);
		}

		removeScript(script: ys.Script) {
			let i = this.scripts.length;
			while (i--) {
				const sc = this.scripts[i];
				if (sc == script) {
					this.scripts.splice(i, 1);
				}
			}
		}

		invokeScript(handler: any, data: any) {
			this.scripts.forEach(sc => {
				if (sc.ListInvoke().indexOf(handler) != -1) {
					sc.OnInvoke(handler, data);
				}
			})
			// let i = this.view.length;
			// let u: ys.UI;
			// while (i--) {
			// 	u = this.view[i];
			// 	u.scripts.forEach(sc => {
			// 		if (sc.ListInvoke().indexOf(handler) != -1) {
			// 			sc.OnInvoke(handler, data);
			// 		}
			// 	})
			// }
		}

	}
}