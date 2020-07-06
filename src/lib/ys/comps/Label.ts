module ys {
	export class Label extends egret.TextField {
		public constructor() {
			super();
			this.verticalAlign = egret.VerticalAlign.MIDDLE;
		}

		public set text(t) {
			t = Label.getLocale(t);
			super.$setText(t);
		}

		public set html(s: string) {
			s = Label.getLocale(s);
			this.textFlow = (new egret.HtmlTextParser).parser(s);
		}

		public static getLocale: Function = (t) => {
			console.log('key:',t,'value:',t);
			return t;
		};
	}
}