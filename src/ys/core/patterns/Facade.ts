namespace ys {
	/**
	 * 简化的puremvc.
	 * 由于puremvc会创建过多的command，导致代码过多。
	 * ys.mvc将Observer和command相关的功能删除。直接通过invoker来调用proxy和mediator
	 * mediator调用invoker，通知proxy获取数据。
	 * proxy获取数据后调用invoker，通知mediator更新数据。
	 * mediator也可以调用invoker，通知mediator。
	 * mediator中不能直接获取proxy。所以proxy获取数据后，必须封装好数据，通过invoker通知出去。
	 * 通过key和value的映射，将MVC解耦合。
	 */
	export class Facade {
		public constructor(mClass: any, vClass: any, cClass: any) {
			this.m = new mClass();
			this.v = new vClass();
			this.c = new cClass();
		}

		private static instance: Facade;
		public static get GET() {
			if (!Facade.instance) {
				Facade.instance = new Facade(Model, View, Controller);
			}
			return Facade.instance;
		}

		private m: Model;
		private v: View;
		private c: Controller;


		// installMediator(ui, MediatorClass): ys.mvc.Mediator {
		// 	return this.v.installMediator(ui, MediatorClass);
		// }

		// uninstallMediator(mediator) {
		// 	this.v.uninstallMediator(mediator);
		// }
		addView(ui:ys.UI)
		{
			this.v.addView(ui)
		}

		removeView(ui:ys.UI)
		{
			this.v.removeView(ui);
		}

		installService(serName, Serviceclass): boolean {
			return this.c.installService(serName, Serviceclass);
		}

		uninstallService(serName) {
			this.c.uninstallService(serName);
		}

		installBucket(bucName, BucketClass): boolean {
			return this.m.installBucket(bucName, BucketClass);
		}

		uninstallBucket(bucName) {
			this.m.uninstallBucket(bucName);
		}

		getBucket(bucName): ys.Bucket {
			return this.m.getBucket(bucName);
		}

		// invokeMediator(handler: any, data: any) {
		// 	this.v.invokeMediator(handler, data);
		// }
		invokeScript(handler: any, data: any)
		{
			this.v.invokeScript(handler,data);
		}

		invokeService(handler: any, data: any, serName: string) {
			this.c.invokeService(handler, data, serName);
		}

	}
}