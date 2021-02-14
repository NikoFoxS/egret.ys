module script {
	export class PopView extends ys.Script {
		public constructor() {
			super();
		}

		public json:string;

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				console.log("click?", o)
				if(this.json)
				{
					ys.popView(this.json);
				}
			}, this)

		}

		onRemove(): void {
			console.log('remove?')
		}
	}
}