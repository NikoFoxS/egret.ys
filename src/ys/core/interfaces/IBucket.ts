namespace ys {
	export interface IBucket {
		SetData(json:any,autoUpdate:boolean);
		UpdateData():void;
	}
}