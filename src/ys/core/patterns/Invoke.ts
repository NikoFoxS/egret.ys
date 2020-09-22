namespace ys {
	export class Invoker implements IInvoker {
		public constructor() {
		}

		InvokeService(handler: any, data: any, serName: string) {
			Facade.GET.invokeService(handler, data, serName);
		}

		// InvokeMediator(handler: any, data: any) {
		// 	Facade.GET.invokeMediator(handler, data);
		// }

		InvokeScript(handler: any, data: any) {
			Facade.GET.invokeScript(handler, data);
		}

		GetBucket(bucName): ys.Bucket {
			return Facade.GET.getBucket(bucName);
		}

	}
}