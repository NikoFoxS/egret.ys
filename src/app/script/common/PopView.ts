module script {
	export class PopView extends ys.Script {
		public constructor() {
			super();
		}

		public json:string;
		public class:string;

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				console.log("click?", o)
				if(this.json)
				{
					ys.popViewJson(this.json);
				}else if(this.class)
				{
					ys.popViewClass(this.class);
				}
			}, this)

		}

		onRemove(): void {
			console.log('remove?')
		}
	}
}