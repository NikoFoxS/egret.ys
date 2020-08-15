module ys.mvc {
	export class Controller {
		public constructor() {
			this.serviceMap = {};
		}

		private serviceMap: any;
		installService(name: string, serClass: any): boolean {
			console.log('<C>安装Service:',name,egret.getQualifiedClassName(serClass)); 
			if (!this.serviceMap[name]) {
				this.serviceMap[name] = serClass;
				console.log(this.serviceMap)
				return true;
			} else {
				return false;
			}
			
		}

		uninstallService(name): void {
			console.log('<C>卸载Service:',name);
			this.serviceMap[name] = null;
			delete this.serviceMap[name];
		}

		invokeService(handler, data, serName) {
			console.log('<C>触发Service:',serName,data,this)
			const serClass = this.serviceMap[serName];
			if (serClass) {
				const s: Service = new serClass();
				s && s.OnInvoke(handler, data);
			}
		}

	}

}