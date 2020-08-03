namespace ys.mvc {
	export class View {
		public constructor() {
			this.mediatorMap = {};
		}

		private observerMap: any;
		private mediatorMap: any;

		registerMediator<M extends ys.mvc.Mediator>(name, MediatorClass: new () => M): boolean {
			let m = this.mediatorMap[name];
			if (!m) {
				m = new MediatorClass();
				m.bind(this);
				m.onRegister();
				this.mediatorMap[name] = m;
				return true;
			} else {
				return false;
			}

		}

		traverseMediators(cb: Function) {
			for (let key in this.mediatorMap) {
				const m = this.mediatorMap[key];
				cb(m);
			}
		}

		getMediator(MediatorName: string): Mediator {
			return this.mediatorMap[MediatorName];
		}

		removeMediator(MediatorName: string): void {
			var mediator: Mediator = this.mediatorMap[MediatorName];
			if (!mediator)
				return null;
			delete this.mediatorMap[MediatorName];
			mediator.unbind();
			mediator.onRemove();
		}

	}
}