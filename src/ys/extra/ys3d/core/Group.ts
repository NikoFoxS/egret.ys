module ys3d {
	export class Group extends Object3D{
		public constructor() {
			super();
			this.type = 'Group';
			this.visible = true;
		}
	}
}