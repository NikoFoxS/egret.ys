module script {
	export class Click extends ys.Script {
		public constructor() {
			super();
			this.notify = [];
		}

		notify: any[];

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
		}

		click() {
			console.log("notify::",JSON.stringify(this.notify))
			this.notify.forEach(val => {
				var {name,data} = val;
				this.sendNotification(name,data);
			})
		}

		onRemove(): void {
			let o = this.owner as egret.DisplayObject;
			o.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
		}
	}
}