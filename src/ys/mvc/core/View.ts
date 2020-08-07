namespace ys.mvc {
	class UIM {
		ui: any;
		mediator: ys.mvc.Mediator;
	}
	export class View {
		public constructor() {
			this.mediatorArr = [];
		}

		private mediatorArr: UIM[];

		installMediator<M extends ys.mvc.Mediator>(ui, MediatorClass: new () => M): ys.mvc.Mediator {
			let m = new MediatorClass();
			let uim = new UIM();
			uim.ui = ui;
			uim.mediator = m;
			this.mediatorArr.push(uim);
			m.bind(ui);
			m.Install();
			console.log('installMediator', this.mediatorArr);
			return m;
		}

		invokeMediator(handler: any, data: any) {
			this.mediatorArr.forEach(uim => {
				let m = uim.mediator;
				if (m.OnInvokeWatch().indexOf(handler) != -1) {
					m.OnInvoke(handler, data);
				}
			});
		}

		uninstallMediator(mediator: ys.mvc.Mediator): void {

			let i = this.mediatorArr.length;
			let uim:UIM;
			while (i--) {
				uim = this.mediatorArr[i];
				if (uim.mediator == mediator) {
					mediator.unbind();
					mediator.Uninstall();
					this.mediatorArr.splice(i, 1);
				}
			}
			console.log(this.mediatorArr);
		}

	}
}