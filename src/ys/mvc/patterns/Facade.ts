namespace ys.mvc {
	/**
	 * 简化的puremvc.
	 * 由于puremvc会创建过多的command，导致代码过多。
	 * ymvc将Observer和command相关的功能删除。直接通过invoker来调用proxy和mediator
	 * mediator调用invoker，通知proxy获取数据。
	 * proxy获取数据后调用invoker，通知mediator更新数据。
	 * mediator也可以调用invoker，通知mediator。
	 * mediator中不能直接获取proxy。所以proxy获取数据后，必须封装好数据，通过invoker通知出去。
	 */
	export class Facade {
		public constructor(mClass: any, vClass: any, cClass: any) {
			this.m = new mClass();
			this.v = new vClass();
			this.c = new cClass(this.m, this.v);
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

		public get M() {
			return this.m;
		}

		public get V() {
			return this.v;
		}

		public get C() {
			return this.c;
		}


	}
}