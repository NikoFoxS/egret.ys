namespace ys {
	let shapPool: ys.Shape[] = [];
	export class Shape extends egret.Shape {
		//-----------------------------
		public static release(s: ys.Shape): void {
			if (!s) {
				return;
			}
			shapPool.push(s);
		}

		public static create(): ys.Shape {
			let s = shapPool.pop();
			if (!s) {
				s = new ys.Shape();
			}
			return s;
		}
		//------------------------------
		drawRec(width: number, height: number, color: number, radius: number = 0) {
			const g = this.graphics;
			g.clear();
			g.beginFill(color);
			if (radius == 0) {
				g.drawRect(0, 0, width, height);
			} else {
				g.drawRoundRect(0, 0, width, height, radius);
			}

			g.endFill();
		}

		drawCirle(radius:number,color:number)
		{
			const g = this.graphics;
			g.clear();
			g.beginFill(color);
			g.drawCircle(0,0,radius);
			g.endFill();
		}

		constructor() {
			super();
		}
	}
}