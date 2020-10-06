namespace ys {
	export class Model {
		public constructor() {
			this.bucketMap = {};
		}
		private bucketMap: any;

		RegisterBucket<T extends ys.Bucket>(bucName: any, buClass: new () => T): void {
			if (!this.bucketMap[bucName]) {
				const b: T = new buClass();
				b.name = bucName;
				this.bucketMap[bucName] = b;
				b.OnRegister();
			}

		}

		getBucket(bucName: any): Bucket {
			return this.bucketMap[bucName ];
		}

		RemoveBucket(bucName:any): void {
			var b: IUnit = this.bucketMap[bucName];
			if (b) {
				b.OnRemove();
				this.bucketMap[bucName] = null;
				delete this.bucketMap[bucName];
			}
		}

	}
}
