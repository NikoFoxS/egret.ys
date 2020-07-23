module ys3d {
	export class BoxNode extends Group {
		//前 后 左 右 上 下
		public constructor(faces: egret.DisplayObject[]) {
			super();
			this.faces = [];
			if (faces.length) {
				let f = faces[0];
				let size = f.width;
				let i = 0;
				let len = 6;
				while (i < len) {
					let face = faces[i];
					if (face) {
						let pl = new PlaneNode(face);
						this.addChild(pl);
						this.faces.push(pl);
					} else {
						this.faces.push(null);
					}
					i++;
				}
				this.size = size;
			}

		}

		private faces: PlaneNode[];
		private _size: number = 0;
		public set size(v) {
			this._size = v;
			// console.log(this.size);
			this.faces.forEach((pl, index) => {
				if (pl) {
					this.updateFace(pl, v * 0.5, index);
				}
			})
		}
		public get size() {
			return this._size;
		}

		private updateFace(pl, size, i) {
			switch (i) {
				case 0:
					pl.position.set(0, 0, size)
					pl.name = '前'
					break;

				case 1:
					pl.position.set(0, 0, -size)
					pl.rotation.y = 180;
					pl.name = '后'
					break;

				case 2:
					pl.position.set(-size, 0, 0)
					pl.rotation.y = -90;
					pl.name = '左'
					break;

				case 3:
					pl.position.set(size, 0, 0)
					pl.rotation.y = 90;
					pl.name = '右'
					break;

				case 4:
					pl.position.set(0, size, 0)
					pl.rotation.x = 90;
					pl.name = '上'
					break;

				case 5:
					pl.position.set(0, -size, 0)
					pl.rotation.x = -90;
					pl.name = '下'
					break;
			}

			return pl;
		}

	}
}