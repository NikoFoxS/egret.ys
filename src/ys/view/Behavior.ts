namespace ys {
	export class Behavior extends egret.EventDispatcher {
		public constructor() {
			super();
		}
		name:string;
		bind(v: egret.DisplayObject) {
			this._v = v;
			console.log(this.name,' -bind- ',v)
		}

		unbind() {
			console.log(this.name,' -unbind- ',this.v)
			this._v = null;
		}

		private _v: egret.DisplayObject;
		public get v()
		{
			return this._v;
		}

		Install(): void {

		}

		Uninstall(): void {

		}
	}
}
