namespace ys.mvc {
	export class Model {
		public constructor() {
			this.bucketMap = {};
		}
		private bucketMap: any;

		installBucket<T extends ys.mvc.Bucket>(bucName, buClass: new () => T): boolean {
			if (!this.bucketMap[bucName]) {
				const b: T = new buClass();
				b.name = bucName;
				this.bucketMap[bucName] = b;
				b.Install();
				console.log('<M>安装Bucket:', bucName, egret.getQualifiedClassName(buClass))
				return true;
			} else {
				return false;
			}

		}

		getBucket(bucName: string): Bucket {
			return this.bucketMap[bucName];
		}

		uninstallBucket(bucName): void {
			var b: IUnit = this.bucketMap[bucName];
			if (b) {
				console.log('<M>卸载Bucket:', bucName);
				delete this.bucketMap[bucName];
				b.Uninstall();
			}
		}

	}
}
