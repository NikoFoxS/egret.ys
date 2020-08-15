namespace ys {
	export class Behavior extends egret.EventDispatcher {
		public constructor() {
			super();
		}
		bind(v: egret.DisplayObject) {
			this._v = v;
			console.log('<Behavior>绑定', egret.getQualifiedClassName(this), ' - ', egret.getQualifiedClassName(v))
		}

		unbind() {
			console.log('<Behavior>解绑', egret.getQualifiedClassName(this), ' - ', egret.getQualifiedClassName(this.v))
			this._v = null;
		}

		private _v: egret.DisplayObject;
		public get v() {
			return this._v;
		}

		upateParams(params: any) {
			(<any>Object).assign(this, params);
		}

		Install(): void {

		}

		Uninstall(): void {

		}
	}
}
