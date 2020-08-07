namespace ys.mvc {
	/**负责界面的管理 */
	export class Mediator extends Invoker implements IUnit, IInvoked {
		public constructor() {
			super();
		}

		bind(v: any) {
			this._v = v;
		}
		unbind() {
			this._v = null;
		}
		private _v: any;
		GetView<T>(): T {
			return this._v;
		}

		Install(): void {

		}
		Uninstall(): void {

		}

		OnInvokeWatch(): any[] {
			return [];
		}

		OnInvoke(handler: number | string, data: any): void {

		}

	}
}