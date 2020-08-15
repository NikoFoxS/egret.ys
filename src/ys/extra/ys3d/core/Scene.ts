module ys3d {
	export class Scene extends Object3D {
		public constructor(w, h) {
			super();
			this.type = 'Scene';
			this.$display = new egret.DisplayObjectContainer();
			const display = this.$display;
			display.x = w * 0.5;
			display.y = h * 0.5;
			this.visible = true;
			this.name = 'scene';
		}

		private $display: egret.DisplayObjectContainer;
		public get display()
		{
			return this.$display;
		}
	}
}