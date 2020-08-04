namespace ys.mvc {
	/**数据仓库，负责数据的储存和提取 */
	export class Bucket implements IUnit,IBucket {
		public constructor() {
		}

		Install(): void {

		}
		Uninstall(): void {

		}

		GetData<T>(key: string): T {
			return;
		}

		SetData(origin:string,data:any) {

		}
	}
}
