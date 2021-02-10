module ys {
	export class Bitmap extends egret.Bitmap implements IProps{
		public constructor() {
			super();
		}

		updateProp(prop:any):void
		{

		}

		
		public set tex(v : string) {
			// this._tex = v;
			this.texture = RES.getRes(v);
			console.log('set tex',v)
		}

		
		
	}
}