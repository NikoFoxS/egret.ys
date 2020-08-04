namespace ys.mvc {
	export interface IBucket {
		GetData<T>(key: string): T;
		SetData(key: string, val: any);
	}
}