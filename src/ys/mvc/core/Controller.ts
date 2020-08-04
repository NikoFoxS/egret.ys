module ys.mvc {
	export class Controller {
		public constructor() {
			this.serviceMap = {};
		}

		private serviceMap: any;
		installService<T extends ys.mvc.Service>(name, serClass: new () => T): boolean {
			if (!this.serviceMap[name]) {
				const s:IUnit = new serClass();
				this.serviceMap[name] = s;
				s.Install();
				return true;
			} else {
				return false;
			}

		}

		uninstallService(name): void {
			var s: Service = this.serviceMap[name];
			if (s) {
				delete this.serviceMap[name];
				s.Uninstall();
			}
		}

		invokeService(handler, data, serName) {
			const s:IInvoked = this.serviceMap(serName);
			s && s.OnInvoke(handler, data);
		}


	}

}