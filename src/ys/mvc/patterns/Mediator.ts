namespace ys.mvc {
	/**负责界面的管理,invoke service 及 update 界面上的数据 */
	export class Mediator extends Invoker implements IUnit, IInvoked {
		public constructor() {
			super();
		}

		Install(): void {

		}
		Uninstall(): void {

		}

		bind(v: any) {
			this._v = v;
		}
		unbind() {
			this._v = null;
		}
		private _v: any;
		getView<T>(): T {
			return this._v;
		}

		handlerInterest():string[]
		{
			return [];
		}

		OnInvoke(handler: string, data: any): void {

		}

	}
}