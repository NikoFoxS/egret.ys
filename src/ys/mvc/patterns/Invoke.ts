namespace ys.mvc {
	export class Invoker implements IInvoker {
		public constructor() {
		}

		InvokeService(handler: string, data: any, serName: string) {
			Facade.GET.invokeService(handler,data,serName);
		}

		InvokeMediator(handler: string, data: any) {
			Facade.GET.invokeMediator(handler,data);
		}

	}
}