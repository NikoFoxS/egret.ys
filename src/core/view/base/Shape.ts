module ys {
	export class Shape extends egret.Shape {
		public constructor() {
			super();
		}

		rect(color, w, h, round) {
			const g = this.graphics;
			g.clear();
			g.beginFill(color);
			if (round == 0) {
				g.drawRect(0, 0, this.width, this.height);
			} else {
				g.drawRoundRect(0, 0, this.width, this.height, round, round);
			}
			g.endFill();

		}

		circle(color, radius) {
			const g = this.graphics;
			g.clear();
			g.beginFill(color);
			if (radius > 0) {
				g.drawCircle(0, 0, radius);
			}
			g.endFill();
		}
	}

	export class Rect extends ys.Shape {
		public constructor() {
			super();
		}

		color: number = 0xff0000;
		round: number = 0;
		$create(): void {
			this.rect(this.color, this.width, this.height, this.round);
		}

	}

	export class Circle extends ys.Shape {
		public constructor() {
			super();
		}

		color: number = 0xff0000;
		radius: number = 0;
		$create(): void {
			this.circle(this.color, this.radius);
		}

	}

}

