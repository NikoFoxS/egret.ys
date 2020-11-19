namespace ys {
	export class Container extends egret.DisplayObjectContainer {
		public constructor() {
			super();
		}

		public addChildren(children: egret.DisplayObject[]) {
			children.forEach(c => {
				this.addChild(c)
			})

		}
	}
}