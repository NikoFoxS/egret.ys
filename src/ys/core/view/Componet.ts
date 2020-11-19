module ys {

	export class Component extends egret.DisplayObjectContainer {
		public constructor(w, h) {
			super();
			this._cw = w;
			this._ch = h;
			this.scripts = [];
			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.scripts.forEach(sc => {
					sc.$Unbind();
				})
			}, this);
		}
		private _cw: number;
		public get comp_width() {
			return this._cw;
		}
		private _ch: number;
		public get comp_height() {
			return this._ch;
		}

		/**添加UI元素 */
		public addUI(uiJson: any) {
			for (var key in uiJson) {
				const display: egret.DisplayObject = uiJson[key];
				if (display) {
					display.name = key + '';
					console.log('addChild', key, display)
					this.addChild(display);
				}
			}
		}
		/**添加样式 */
		public addStyle(styleClass) {
			const style: ys.Style = new styleClass();
			style.Init(this);
		}
		private scripts: ys.Script[];
		/**添加脚本 */
		public addScript(scriptClass: any, data?: any) {
			const sc: ys.Script = new scriptClass();
			sc.$Bind(this, data);
		}

		public async start() {

		}

	}
}