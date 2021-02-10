namespace ys {
	export class Model {
		public constructor() {
			if (!Model._data) {
				Model._data = {};
			}
		}

		private static _data: any;

		setData(key, val) {
			Model._data[key] = val;
		}

		getData(key) {
			return Model._data[key];
		}
	}
}