namespace ys.mvc {
	export interface IBucket {
		SetData(json:any,autoUpdate:boolean);
		UpdateData():void;
	}
}