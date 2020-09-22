namespace ys {
	/**提供服务，服务完成后，通知mediator或者其他的service */
	export class Service extends Invoker implements IInvoked {
		public constructor() {
			super();
		}
		OnInvoke(handler: number | string, data: any): void {
			throw new Error('need override OnInvoke()')
		}

	}
}
