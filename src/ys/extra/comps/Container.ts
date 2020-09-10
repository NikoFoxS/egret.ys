namespace ys {
	let containerPool: ys.Container[] = [];
	export class Container extends egret.DisplayObjectContainer {


		public static release(con: ys.Container): void {
			if (!con) {
				return;
			}
			containerPool.push(con);
		}

		public static create(): ys.Container {
			let con = containerPool.pop();
			if (!con) {
				con = new ys.Container;
			}
			return con;
		}
		//------------------------------
		public constructor() {
			super();
		}
	}
}