module ys {
	export class Controller {
		public constructor() {
			this.serviceMap = {};
		}

		private serviceMap: any;
		RegisterService(name: any, serClass: any): void {
			const s: Service = new serClass();
			this.serviceMap[name] = s;
			s.OnRegister();
			console.log('RegisterService::',s.className)
		}

		RemvoeService(name): void {
			const s: Service = this.serviceMap[name];
			s.OnRemove();
			this.serviceMap[name] = null;
			delete this.serviceMap[name];
		}

		InvokeService(handler: number, data: any, serName: any) {
			const s:Service = this.serviceMap[serName];
			if (s) {
				console.log('InvokeService::',s.className,'handler',handler,'data',data)
				s && s.OnInvoke(handler, data);
			}
		}

	}

}