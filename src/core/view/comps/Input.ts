namespace ys {
	export class Input extends egret.TextField implements IProps{
		public constructor() {
			super();
			this.type = egret.TextFieldType.INPUT;
		}

		updateProp(prop:any):void
		{

		}
	}
}