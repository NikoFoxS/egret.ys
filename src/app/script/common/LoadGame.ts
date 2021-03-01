module script {
	export class LoadGame extends ys.Script{
		public constructor() {
			super();
		}

		public json:string;

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			o.touchEnabled = true;
			o.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				if(this.json)
				{
					ys.loadGame(this.json);
					ys.Context.main.visible = false;
				}
			}, this)

		}

		onRemove(): void {
			console.log('remove?')
		}
	}
}