namespace ys {
	export class Script extends Observer {
		public constructor() {
			super();
		}

		private _owner: any;
		public get owner(): any {
			return this._owner;
		}
		public set owner(v: any) {
			this._owner = v;
		}

		sendNotification(name: string, data: any): void {
			ys.Subject.GET.notify(name, data);
		}

		onAdded() {

		}

		onRemove() {

		}

	}
}