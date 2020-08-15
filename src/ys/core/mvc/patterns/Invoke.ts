namespace ys.mvc {
	export class Invoker implements IInvoker {
		public constructor() {
		}

		ServiceInvoke(handler: any, data: any, serName: string) {
			Facade.GET.invokeService(handler, data, serName);
		}

		MediatorInvoke(handler: any, data: any) {
			Facade.GET.invokeMediator(handler, data);
		}

		BucketGet(bucName): ys.mvc.Bucket {
			return Facade.GET.getBucket(bucName);
		}

	}
}