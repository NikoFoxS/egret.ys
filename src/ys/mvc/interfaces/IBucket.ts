namespace ys.mvc {
	export interface IBucket {
		/**通过KeyValue的形式，对外提供数据 */
		GetData<T>(key: string): T;
		/**对来源数据进行校验及封装 origin:数据来源，data:具体数据  */
		SetData(origin:string,data:any);
	}
}