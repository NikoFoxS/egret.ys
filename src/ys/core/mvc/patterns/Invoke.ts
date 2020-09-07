namespace ys.mvc {
	export class Invoker implements IInvoker {
		public constructor() {
		}

		InvokeService(handler: any, data: any, serName: string) {
			Facade.GET.invokeService(handler, data, serName);
		}

		InvokeMediator(handler: any, data: any) {
			Facade.GET.invokeMediator(handler, data);
		}

		GetBucket(bucName): ys.mvc.Bucket {
			return Facade.GET.getBucket(bucName);
		}

	}
}