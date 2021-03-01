module ys {
	export class Shape extends egret.Shape {
		public constructor() {
			super();
		}

		public color: number = 0xff0000;
		public round: number = 0;
		$create(): void {
			const g = this.graphics;
			g.clear();
			g.beginFill(this.color);
			if (this.round == 0) {
				g.drawRect(0, 0, this.width, this.height);
			} else {
				g.drawRoundRect(0, 0, this.width, this.height, this.round, this.round);
			}
			g.endFill();

		}

		
	}
}