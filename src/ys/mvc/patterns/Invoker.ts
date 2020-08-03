namespace ys.mvc {
	export class Invoker {
		public constructor() {
		}

		sendNotification(name: string, data?: any) {
			this.facade.C.invokeMediator(name,data);
		}

		get facade()
		{
			return Facade.GET;
		}


	}
}