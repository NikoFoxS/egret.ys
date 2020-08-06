namespace ys.mvc {
	/**数据仓库，负责数据的储存和提取 */
	export class Bucket extends Invoker implements IUnit, IBucket {
		public constructor() {
			super();
			this._data = {};
		}

		private bucName: string;
		private _data: any;
		public set name(nm)
		{
			this.bucName = nm;
		}

		get data() {
			//暂时用浅拷贝
			let d = {};
			(<any>Object).assign(d, this._data)
			return d;
		}

		SetData(key: string, value: any) {
			if (value != null) {
				this._data[key] = value;
				this.InvokeMediator(this.bucName, { key: key, value: value });
			}
		}

		Install(): void {

		}
		Uninstall(): void {

		}
	}
}
