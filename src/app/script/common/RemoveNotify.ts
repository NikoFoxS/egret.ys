module script {
	export class RemoveNotify extends ys.Script {
		public constructor() {
			super();
		}

		notify: string = '';
		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.once(egret.Event.REMOVED_FROM_STAGE, () => {
				if (this.notify != '') {
					this.sendNotification(this.notify);
				}
			}, this);
		}

		onRemove(): void {
			
		}
	}
}