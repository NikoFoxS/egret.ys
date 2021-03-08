namespace ys {
	export class Input extends egret.TextField{
		public constructor() {
			super();
			this.type = egret.TextFieldType.INPUT;
			this.border = true;
			this.borderColor = 0x000000;
		}
	}
}