module ys {
	export class Controller {
		public constructor() {
			this.serviceMap = {};
		}

		private serviceMap: any;
		RegisterService(name: number, serClass: any): void {
			const s: Service = new serClass();
			this.serviceMap[name + ''] = s;
		}

		RemvoeService(name): void {
			const s: Service = this.serviceMap[name + ''];
			s.OnRemove();
			this.serviceMap[name + ''] = null;
			delete this.serviceMap[name + ''];
		}

		InvokeService(handler: number, data: any, serName: number) {
			const s = this.serviceMap[serName + ''];
			if (s) {
				s && s.OnInvoke(handler, data);
			}
		}

	}

}