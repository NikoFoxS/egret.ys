namespace ys {
	let containerPool: ys.Container[] = [];
	export class Container extends egret.DisplayObjectContainer {

		public static release(con: ys.Container): void {
		}

		public static create(): ys.Container {
			return new ys.Container();
		}
		//------------------------------
		public constructor() {
			super();
		}
	}
}