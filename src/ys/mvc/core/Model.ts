namespace ys.mvc {
	export class Model {
		public constructor() {
			this.bucketMap = {};
		}
		private bucketMap: any;

		installBucket<T extends ys.mvc.Bucket>(bucName, buClass: new (name) => T): boolean {
			if (!this.bucketMap[bucName]) {
				const b: T = new buClass(bucName);
				this.bucketMap[bucName] = b;
				b.Install();
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
				delete this.bucketMap[bucName];
				b.Uninstall();
			}
		}

	}
}
