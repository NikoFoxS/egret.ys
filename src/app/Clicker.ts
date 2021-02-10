module script {
	export class Clicker extends ys.Script {
		public constructor() {
			super();
		}

		onAdded(): void {
			let o = this.owner as ys.Bitmap;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				console.log("click?")
				ys.removeDisplayObject(o);
			}, this)

		}

		onRemove():void
		{
			console.log('remove?')
		}
	}
}