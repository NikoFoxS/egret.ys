module ys3d {

	/**
	 * 3D透视渲染器
	 */
	export class Render {
		public constructor() {

		}

		public render(scene: Scene, cam: Camera) {
			scene.display.removeChildren();

			scene.updateMatrixWorld();
			cam.updateMatrixWorld();

			const renderList = [];
			//寻找渲染对象
			scene.traverse(child => {
				//to do 剔除显示范围外的对象
				//如果不显示，停止下一层。
				if (!child.visible) return true;
				//如果无draw方法,跳过
				if (!child.draw) return;
				renderList.push(child);
			})

			//深度排序
			renderList.forEach((child: RenderNode) => {
				let tempV4: Vector4 = child.worldPosition;
				tempV4.x = 0;
				tempV4.y = 0;
				tempV4.z = 0;
				tempV4.w = 1;
				//将原点变换到世界坐标
				tempV4 = child.worldMatrix.transformV4(tempV4);
				//将原点变换到视图坐标
				tempV4 = cam.viewMatrix.transformV4(tempV4);
				child.worldPosition = tempV4;
			})
			//深度排序
			renderList.sort((a: RenderNode, b: RenderNode) => {
				const az = a.worldPosition.z;
				const bz = b.worldPosition.z;
				const alen = a.worldPosition.getLength();
				const blen = b.worldPosition.getLength();

				const dis = alen - blen;
				if (Math.abs(dis) < 0.0001) {
					if (az == bz) {
						return a.id - b.id;
					} else {
						bz - az;
					}
				} else {
					return -dis;
				}

			});
			
			renderList.forEach((node: RenderNode, index) => {
				const pos = node.worldPosition;
				node.draw(scene, cam);
			})

		}



	}

}