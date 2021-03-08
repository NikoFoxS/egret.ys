module script {
	export class Float extends ys.Script {
		public constructor() {
			super()
			this.time = 1000;
			this.dy = 10;
		}

		time: number;
		dy: number;

		onAdded(): void {
			let o = this.owner as egret.DisplayObject;
			//延迟处理，因为添加脚本的时候，owner的属性还没设置好。
			setTimeout(() => {
				if (this.dy != 0) {
					egret.Tween.get(o, { loop: true })
						.to({ y: o.y - this.dy }, this.time)
						.to({ y: o.y }, this.time)
				}
			}, 100);

		}

		onRemove(): void {
			let o = this.owner as egret.DisplayObject;
			egret.Tween.removeTweens(o);
		}
	}
}