module behavior {
	export class Clicker extends ys.Behavior {
		public constructor(target: egret.DisplayObject, delay = 1000) {
			super();
			this.Bind(target, { delay: delay });
		}

		OnStart() {
			const t = this.target;
			t.touchEnabled = true;
			t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
		}


		private click(e: egret.TouchEvent) {
			let {delay} = this.data || { delay: 2000 };
			delay = delay;
			const t = this.target;
			t.touchEnabled = false;
			setTimeout(function () {
				t.touchEnabled = true;
			}, delay);
			// this.dispatchEventWith('click', false);
			this.onClick && this.onClick(e);
		}

		public onClick: Function;

		OnStop() {
			this.onClick = null;
		}


	}
}