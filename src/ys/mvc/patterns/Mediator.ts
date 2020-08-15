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
			throw new Error('need override Install()')
		}
		Uninstall(): void {
			throw new Error('need override Uninstall()')
		}
		/**列出需要关注的invoke */
		OnInvokeList(): any[] {
			return [];
		}
		/**处理 invoke*/
		OnInvoke(handler: number | string, data: any): void {
			throw new Error('need override Install()')
		}

	}
}