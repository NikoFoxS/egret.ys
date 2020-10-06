namespace ys {

	export class Service implements IUnit, IInvoked {
		public constructor() {
			this.invoker = new ys.Invoker();
		}

		protected invoker: ys.Invoker;

		OnRegister() {

		}

		OnRemove() {

		}

		OnInvoke(handler: number | string, data: any): void {
			throw new Error('need override OnInvoke()')
		}

	}
}
