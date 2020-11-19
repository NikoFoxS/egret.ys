module ys {
	export interface IDataGet {
		getData<T>(key: string): T;
	}

	export interface IDataSet {
		setData(json: any);
	}

	class Block { }

	export class Data implements IDataGet, IDataSet {
		public constructor(b: Block) {
			this._data = {};
		}

		private static instance: Data;
		public static get GET() {
			if (!ys.Data.instance) {
				ys.Data.instance = new ys.Data(new Block);
			}
			return ys.Data.instance;
		}


		private _data: any;
		setData(json: any) {
			if (json) {
				//赋值
				(<any>Object).assign(this._data, json);
			}
		}

		getData<T>(key: string): T {
			return this._data[key];
		}
	}

}