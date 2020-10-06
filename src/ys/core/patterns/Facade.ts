namespace ys {
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

		public get model()
		{
			return this.m;
		}

		public get view()
		{
			return this.v;
		}

		public get controller()
		{
			return this.c;
		}


		// // installMediator(ui, MediatorClass): ys.mvc.Mediator {
		// // 	return this.v.installMediator(ui, MediatorClass);
		// // }

		// // uninstallMediator(mediator) {
		// // 	this.v.uninstallMediator(mediator);
		// // }
		// addView(ui: ys.UI) {
		// 	this.v.addView(ui)
		// }

		// removeView(ui: ys.UI) {
		// 	this.v.removeView(ui);
		// }

		// addScript(sc) {
		// 	this.v.addScript(sc)
		// }

		// removeScript(sc) {
		// 	this.v.removeScript(sc);
		// }

		// installService(serName, Serviceclass): boolean {
		// 	return this.c.installService(serName, Serviceclass);
		// }

		// uninstallService(serName) {
		// 	this.c.uninstallService(serName);
		// }

		// installBucket(bucName, BucketClass): boolean {
		// 	return this.m.installBucket(bucName, BucketClass);
		// }

		// uninstallBucket(bucName) {
		// 	this.m.uninstallBucket(bucName);
		// }

		// getBucket(bucName): ys.Bucket {
		// 	return this.m.getBucket(bucName);
		// }

		// // invokeMediator(handler: any, data: any) {
		// // 	this.v.invokeMediator(handler, data);
		// // }
		// invokeScript(handler: any, data: any) {
		// 	this.v.invokeScript(handler, data);
		// }

		// invokeService(handler: any, data: any, serName: string = 'main') {
		// 	this.c.invokeService(handler, data, serName);
		// }

	}
}