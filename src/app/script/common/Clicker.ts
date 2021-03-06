module script {
	export class Clicker extends ys.Script {
		public constructor() {
			super();
		}

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
		}

		click()
		{

		}

		onRemove():void
		{
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = false;
			o.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
		}
	}
}