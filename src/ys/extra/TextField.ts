namespace ys {
	let txtPool: ys.TextField[] = [];
	export class TextField extends egret.TextField {

		//-----------------------------
		public static release(t: ys.TextField): void {
			// if (!t) {
			// 	return;
			// }
			// txtPool.push(t);
		}

		public static create(): ys.TextField {
			// let t = txtPool.pop();
			// if (!t) {
			// 	t = new ys.TextField;
			// }
			// return t;
			return new ys.TextField();
		}
		//多语言
		public static getLocale: Function = (t) => {
			console.log('key:', t, 'value:', t);
			return t;
		};
		//--------------------------------
		public constructor() {
			super();
			this.verticalAlign = egret.VerticalAlign.MIDDLE;
		}

		public set text(t) {
			t = TextField.getLocale(t);
			super.$setText(t);
		}

		public get text() {
			return super.$getText();
		}

		public set html(s: string) {
			s = TextField.getLocale(s);
			this.textFlow = (new egret.HtmlTextParser).parser(s);
		}


	}
}