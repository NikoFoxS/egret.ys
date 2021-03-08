module ys {
	export class Script implements ys.IObserver {
		public constructor() {

		}

		private _owner: egret.DisplayObject;
		public get owner(): egret.DisplayObject {
			return this._owner;
		}
		public set owner(v: egret.DisplayObject) {
			this._owner = v;
			ys.Subject.registerObserver(this);
			v.once(egret.Event.REMOVED_FROM_STAGE, () => {
				ys.Subject.removeObserver(this);
				this.onRemove();
				this._owner = null;
			}, this);
		}

		sendNotification(name, data?: any) {
			ys.Subject.notify(name, data);
		}

		$create(): void {

		}

		listNotification() {
			return [];
		}

		onNotification(name, data) {

		}

		onAdded() {

		}

		onRemove() {

		}


	}
}