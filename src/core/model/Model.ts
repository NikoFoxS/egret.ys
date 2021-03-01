namespace ys {
	export class Model {
		public constructor() {
		}

		private static _data: any = {};

		static set(key, val) {
			let obj = {};
			obj[key] = val;

			console.log(Model._data[key],obj);
			if (Model._data.hasOwnProperty(key)) {
				(<any>Object).assign(Model._data, obj)
			} else {
				Model._data[key] = val;
			}
		}

		static get(key: string) {
			key = key.replace("{{", "");
			key = key.replace("}}", "");
			let arr = key.split('.');
			let len = arr.length;
			let obj = Model._data;
			for (let i = 0; i < len; i++) {
				obj = obj[arr[i]]
				if (!obj) {
					break;
				}
			}
			return obj;
		}

	}

}