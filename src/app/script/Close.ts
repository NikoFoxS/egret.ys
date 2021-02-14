module script {
	export class Close extends ys.Script{
		public constructor() {
			super();
		}

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				ys.removeDisplayObject(o.parent);
			}, this)

		}

		onRemove():void
		{
		}
	}
}