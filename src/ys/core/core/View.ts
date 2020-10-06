namespace ys {
	export class View {
		public constructor() {
			this.subject = new ys.Subject();
		}

		private subject: ys.Subject;
		RegisterScript(script: ys.UIScript) {
			this.subject.registerObserver(script);
		}

		removeScript(script: ys.UIScript) {
			this.subject.removeObserver(script);
		}

		invokeScript(handler: number, data: any) {
			this.subject.notify(handler, data);
		}

	}
}