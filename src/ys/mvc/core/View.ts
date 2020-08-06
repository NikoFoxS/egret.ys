namespace ys.mvc {
	export class View {
		public constructor() {
			this.mediatorMap = {};
		}

		private observerMap: any;
		private mediatorMap: any;

		installMediator<M extends ys.mvc.Mediator>(medName, MediatorClass: new () => M): ys.mvc.Mediator {
			let m: Mediator = this.mediatorMap[medName];
			if (!m) {
				m = new MediatorClass();
				this.mediatorMap[medName] = m;
				return m;
			} else {
				return null;
			}

		}

		invokeMediator(handler: string, data: any) {
			for (let key in this.mediatorMap) {
				const m: Mediator = this.mediatorMap[key];
				if (m.OnInvokeWatch().indexOf(handler) != -1) {
					m.OnInvoke(handler, data);
				}
			}
		}

		uninstallMediator(medName: string): void {
			var m: Mediator = this.mediatorMap[medName];
			if (!m)
				return null;
			delete this.mediatorMap[medName];
			m.unbind();
			m.Uninstall();
		}

	}
}