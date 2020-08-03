module ys.mvc {
	export class Controller {
		public constructor(m: Model, v: View) {
			this.m = m;
			this.v = v;
		}
		private m: Model;
		private v: View;



		invokeProxy(handler, data, proxyName) {
			const p = this.m.getProxy(proxyName);
			p && p.invoke(handler, data);
		}

		getData<T>(key, proxyName) {
			const p = this.m.getProxy(proxyName);
			return p && p.getData<T>(key) || null;
		}

		invokeMediator(handler, data, mediatorName = '') {
			if (mediatorName == '') {
				this.v.traverseMediators((m: Mediator) => {
					m.invoke(handler, data);
				})
			} else {
				const m = this.v.getMediator(mediatorName);
				m && m.invoke(handler, data)
			}
		}

	}

}