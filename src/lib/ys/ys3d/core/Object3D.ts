module ys3d {
	let ID = 0;
	export class Object3D {
		public constructor() {
			this.position = Vector3.create();
			this.rotation = Euler.create();
			this.quat = Quaternion.create();
			this.scale = Vector3.create(1, 1, 1);
			this.type = 'Object3D';
			this.id = ID++;
			this.visible = false;

			this.matrix = Matrix4.create();
			this.worldMatrix = Matrix4.create();

			this.rotation.onChange = () => { 
				//欧拉角改变后，更新四元素。更新后的四元素提供给模型变换矩阵用。
				this.quat.fromEuler(this.rotation) 
			};

			this.quat.onChange = () => { 
				//四元素改变后，更新欧拉角。
				this.rotation.fromQuaternion(this.quat) 
			};
			this.rotation.set(0,0,0);
		}

		public name: string;

		public position: Vector3;
		public rotation: Euler;
		public scale: Vector3;
		protected quat: Quaternion;

		public userData: any;
		public parent: Object3D = null;
		public children: Object3D[] = [];

		public type: string;
		public id: number;
		public visible: boolean;
		//局部变换矩阵
		public matrix: Matrix4;
		//世界变换矩阵
		public worldMatrix: Matrix4;

		public updateMatrix() {
			const matrix = this.matrix;
			const q = this.quat;
			const pos = this.position;
			const scale = this.scale;
			//通过旋转四元素，平移，缩放，构建模型变换矩阵
			matrix.compose(q, pos, scale);
			// matrix.translate(pos);
			// matrix.scale(scale);
			// matrix.rotate(this.rotation.x,Vector3.create(1,0,0));
			// matrix.rotate(this.rotation.y,Vector3.create(0,1,0));
			// matrix.rotate(this.rotation.z,Vector3.create(0,0,1));
			
		}

		public updateMatrixWorld() {
			//更新自身矩阵
			this.updateMatrix();
			//更新世界矩阵
			if (this.parent) {
				//关联父级的模型变换矩阵
				this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
			} else {
				//无父级
				this.worldMatrix.copy(this.matrix);
			}

			//更新下一层级
			this.children.forEach(child => {
				child.updateMatrixWorld();
			})
		}

		public getChildIndex(obj: Object3D) {
			return this.children.indexOf(obj);
		}

		public addChild(obj: Object3D) {
			//从parent里删除
			obj.parent && obj.parent.removeChild(obj);
			const index = this.getChildIndex(obj);
			if (index == -1) {
				//设置新的parent
				obj.parent = this;
				//添加到children；
				this.children.push(obj)
			}

		}

		public removeChild(obj: Object3D) {
			let index = this.getChildIndex(obj);
			if (index != -1) {
				obj.parent = null;
				this.children.splice(index, 1);
			}
		}
		/**逐层遍历 */
		public traverse(callback) {
			//如果返回true，就停止下一层的遍历。
			if (callback(this)) return;
			//遍历下一层
			this.children.forEach(child => {
				child.traverse(callback);
			})
		}

	}
}