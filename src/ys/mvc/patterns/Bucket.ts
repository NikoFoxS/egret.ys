namespace ys.mvc {
	/**数据仓库，负责数据的储存和提取 */
	export class Bucket extends Invoker implements IUnit, IBucket {
		public constructor(bucName) {
			super();
			this.bucName = bucName;
		}

		private bucName: string;

		Install(): void {

		}
		Uninstall(): void {

		}

		GetData<T>(key: string): T {
			return;
		}

		SetData(origin: string, data: any) {
			this.InvokeMediator(this.bucName, data);
		}
	}
}
