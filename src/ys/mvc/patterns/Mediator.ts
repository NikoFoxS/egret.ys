namespace ys.mvc {
	export class Mediator extends Invoker implements IMediator {
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
		getView<T>(): T {
			return this._v;
		}

		onRegister(): void {

		}
		onRemove(): void {

		}
		invoke(handler: string, data: any): void {

		}

	}
}