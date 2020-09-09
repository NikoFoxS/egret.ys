namespace ys
{
    let shapPool: ys.Shape[] = [];
    export class Shape extends egret.Shape
    {
        //-----------------------------
		public static release(s:ys.Shape): void {
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

        constructor()
        {
            super();
        }
    }
}