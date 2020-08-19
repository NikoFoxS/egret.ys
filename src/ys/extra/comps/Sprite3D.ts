module ys {

	export class Sprite3DRenderer {
		static render(sp3d: Sprite3D) {
			let i = sp3d.numChildren;
			let arr: Sprite3D[] = [];

			//更新位置
			sp3d.update(arr);
			//排序
			arr.sort((a, b) => { return a.worldPosition.z - b.worldPosition.z });
			arr.forEach(a=>{
				a.parent.addChild(a);
			})
			//透视投影渲染
			sp3d.render();

		}
	}
	export class Sprite3D extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.position = new Point();
			this.scale = new Point(1, 1, 1);
		}

		static camera_focalLength: number = 200;
		static camera_far: number = 2000;
		// static camera_position: Point;
		public worldPosition: ys.Point;
		public position: ys.Point;
		public scale: Point;
		public childArr: Sprite3D[];
		public add(sp3d: Sprite3D) {
			this.addChild(sp3d);
		}

		public update(arr: any[]) {
			let pos: Point = this.position;
			let pa: Sprite3D = this.parent as Sprite3D;
			if (pa.position) {
				pos = Math3D.localToWorld(this.position, pa.position);
			}
			this.worldPosition = pos;
			arr.push(this);

			let i = this.numChildren;
			while (i--) {
				let sp3d: Sprite3D = this.getChildAt(i) as Sprite3D;
				if (sp3d instanceof ys.Sprite3D) {
					sp3d.update(arr);
				}
			}

			// console.log('upate?',pos,this.name);
		}

		public render() {
			if (!this.visible) {
				return
			}

			// console.log('render?',this.name);

			let pos: Point = this.worldPosition;

			let focalLength = Sprite3D.camera_focalLength;
			let far = Sprite3D.camera_far;

			var z = pos.z;
			if (z < focalLength && z > -far) {
				this.visible = true;
			} else {
				this.visible = false;
			}

			// var pt = Math3D.rotatePoint3D(this.position, new Point(), new Point() );
			var p2 = Math3D.projectTo2D(pos, new Point(), focalLength);
			this.x = p2.x;
			this.y = p2.y;

			this.scaleX = p2.z * this.scale.x;
			this.scaleY = p2.z * this.scale.y;

			let i = this.numChildren;
			while (i--) {
				let sp3d: Sprite3D = this.getChildAt(i) as Sprite3D;
				if (sp3d instanceof ys.Sprite3D) {
					sp3d.render();
				}
			}
		}
	}

	export class Point {
		public x: number;
		public y: number;
		public z: number;
		constructor(x = 0, y = 0, z = 0) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public clone() {
			return new Point(this.x, this.y, this.z);
		}
	}
}