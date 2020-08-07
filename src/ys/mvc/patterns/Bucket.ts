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

		get data() {
			return this._data;
		}

		UpdateData() {
			//深拷贝
			this._data = JSON.parse(JSON.stringify(this._origin));
		}

		SetData(json: any, Mhandler, autoUpdate: boolean = true) {
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
				this.MediatorInvoke(Mhandler, arr);
			}
		}

		Install(): void {

		}
		Uninstall(): void {

		}
	}
}
