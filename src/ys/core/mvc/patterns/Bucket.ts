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
		UpdateData() {
			//深拷贝parse和stringify会有一定的性能损失
			this._data = JSON.parse(JSON.stringify(this._origin));
		}
		/**设置数据 */
		SetData(json: any, handler, autoUpdate: boolean = true) {
			if (json) {
				//赋值
				(<any>Object).assign(this._origin, json);
				//更新 get
				autoUpdate && this.UpdateData();
				//通知
				let arr=[];
				for(let k in json)
				{
					arr.push(k);
				}
				this.MediatorInvoke(handler, arr);
			}
		}

		Install(): void {

		}
		Uninstall(): void {

		}
	}
}
