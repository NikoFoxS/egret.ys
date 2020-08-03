namespace ys.mvc {
	export class Model {
		public constructor() {
			this.proxyMap = {};
		}
		private proxyMap: any;

		registerProxy<P extends ys.mvc.Proxy>(name, proxyClass: new () => P): boolean {
			if (!this.proxyMap[name]) {
				const proxy = new proxyClass();
				this.proxyMap[name] = proxy;
				proxy.onRegister();
				return true;
			} else {
				return false;
			}

		}

		removeProxy(name): void {
			var proxy: Proxy = this.proxyMap[name];
			if (proxy) {
				delete this.proxyMap[name];
				proxy.onRemove();
			}
		}

		getProxy(name): Proxy {
			return this.proxyMap[name];
		}

	}
}
