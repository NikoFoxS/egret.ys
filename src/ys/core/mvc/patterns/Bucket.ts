namespace ys.mvc {
	/**数据仓库，负责数据的储存和提取 */
	export class Bucket extends Invoker implements IUnit, IBucket {
		public constructor() {
			super();
			this._data = {};
			this._origin = {};
		}

		private bucName: string;
		private _data: any;//get数据
		private _origin: any;//set数据
		public set name(nm) {
			this.bucName = nm;
		}
		/**获取数据的copy */
		get data() {
			return this._data;
		}
		/**更新数据 */
		UpdateData(handler = null) {
			//深拷贝parse和stringify会有一定的性能损失,所以等SetData都执行完了，再UpdateData。
			this._data = JSON.parse(JSON.stringify(this._origin));
			if (handler != null) {
				this.MediatorInvoke(handler, null);
			}

		}
		/**设置数据 */
		SetData(json: any) {
			if (json) {
				//赋值
				(<any>Object).assign(this._origin, json);
			}
		}

		Install(): void {

		}
		Uninstall(): void {

		}
	}
}
