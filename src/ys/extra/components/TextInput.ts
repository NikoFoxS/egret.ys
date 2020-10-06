module ys {
	export class TextInput extends egret.TextField {
		public static create() {
			return new ys.TextInput();
		}
		
		public constructor() {
			super();
		}

		public create(w, h, size = 0) {
			this.type = egret.TextFieldType.INPUT;
			this.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.width = w;
			this.height = h;
			if (size) {
				this.size = size;
			} else {
				this.size = Math.floor(h * 0.6);
			}
			this.background = true;
			this.textColor = 0x000000;
		}

		private holder = ''
		/**输入提示 */
		public set placeholder(s) {
			this.holder = s;
			this.onFocusOut();
			this.addEventListener(egret.Event.FOCUS_IN, this.onFocus, this);
			this.addEventListener(egret.Event.FOCUS_OUT, this.onFocusOut, this);
		}

		private onFocusOut() {
			if (this.text == '') {
				this.text = this.holder;
				this.textColor = 0xcccccc;
			}
		}

		private onFocus() {
			this.textColor = 0x000000;
			if (this.text == this.holder) {
				this.text = '';
			}

		}
	}
}