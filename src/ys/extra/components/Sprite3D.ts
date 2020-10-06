module ys {
	/**
	 * 简单的3D模拟，摄像机只能平移，不能旋转。
	 */
	export class Sprite3D extends egret.DisplayObjectContainer {
		public constructor(type = 'Sprite3D') {
			super();
			this.position = new Point();
			this.worldPosition = new Point();
			this.scale = new Point(1, 1, 1);
			this._type = type;
			this.childArr = [];
		}

		private _type: string;
		public get type() {
			return this._type;
		}

		public worldPosition: ys.Point;
		public position: ys.Point;
		public scale: Point;
		public childArr: Sprite3D[];
		public add(sp3d: Sprite3D) {
			this.childArr.push(sp3d);
		}

		public remove(sp3d: Sprite3D) {
			let i = this.childArr.length;
			while (i--) {
				let sp = this.childArr[i];
				if (sp == sp3d) {
					this.childArr.splice(i, 1);
					break;
				}
			}
		}

		public update(arr: any[], camera: Sprite3DCamera) {
			let pos: Point = this.position;
			this.worldPosition.x = pos.x - camera.position.x;
			this.worldPosition.y = pos.y - camera.position.y;
			this.worldPosition.z = pos.z - camera.position.z;
			if (this.type == 'Sprite3D') {
				arr.push(this);
			}

			let i = this.childArr.length;
			while (i--) {
				let sp3d: Sprite3D = this.childArr[i];
				if (sp3d instanceof ys.Sprite3D) {
					sp3d.update(arr, camera);
				}
			}

		}

		public render(camera: Sprite3DCamera) {

			let pos: Point = this.worldPosition;

			let focalLength = camera.focal;
			let far = camera.far;

			if (this.type == 'Sprite3D') {
				var z = pos.z;
				if (z > 0 && z < far) {
					this.visible = true;
				} else {
					this.visible = false;
				}

				if (this.visible) {

					var p2 = camera.projectTo2D(pos);
					this.x = p2.x;
					this.y = p2.y;

					this.scaleX = p2.z * this.scale.x;
					this.scaleY = p2.z * this.scale.y;
				}
			} else {
				let i = this.childArr.length;
				while (i--) {
					let sp3d: Sprite3D = this.childArr[i];
					if (sp3d instanceof ys.Sprite3D) {
						sp3d.render(camera);
					}
				}
			}


		}
	}

	export class Sprite3DScene extends Sprite3D {
		constructor() {
			super('Sprite3DContainer');
		}

		updateAndRender(camera: Sprite3DCamera) {
			let i = this.childArr.length;
			let arr: Sprite3D[] = [];

			//更新位置
			this.update(arr, camera);
			this.removeChildren();
			//排序
			arr.sort((a, b) => { return b.worldPosition.z - a.worldPosition.z });
			arr.forEach(a => {
				this.addChild(a);
			})
			//透视投影渲染
			this.render(camera);
		}
	}

	export class Sprite3DCamera extends Sprite3D {
		constructor() {
			super('Sprite3DCamera');
		}

		public focal: number;
		public far: number;

		projectTo2D(p3: Point) {
			var x = p3.x;
			var y = p3.y;
			var z = p3.z;
			if (z > 0) {
				var scaleFactor = this.focal / z;
				x = x * scaleFactor;
				y = y * scaleFactor;
			}
			return new Point(x, -y, scaleFactor);
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