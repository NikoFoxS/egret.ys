module ys {
	export class UIComponent extends ys.View implements ys.IObserver {
		public constructor() {
			super();
			ys.Subject.registerObserver(this);
			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				ys.Subject.removeObserver(this);
			}, this);
			this.api = [];
		}

		sendNotification(name, data) {
			ys.Subject.notify(name, data);
		}

		listNotification() {
			return this.api;
		}

		api: string[];

		onNotification(name: string, data) {
			this.onApiCall(name);
		}

		onApiCall(name: string,data?:any) {
			if (name.indexOf('.') != -1) {
				let arr = name.split('.');
				let method = arr[arr.length-1];
				try {
					this[method](data);
				} catch (error) {
					
				}
			}
		}

	}
}