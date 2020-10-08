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
				console.log('RegisterBucket::', b.className)
			}

		}

		GetBucket(bucName: any): Bucket {
			const buc: ys.Bucket = this.bucketMap[bucName];
			console.log('GetBucket::', buc.className);
			return buc;
		}

		RemoveBucket(bucName: any): void {
			var b: IUnit = this.bucketMap[bucName];
			if (b) {
				b.OnRemove();
				this.bucketMap[bucName] = null;
				delete this.bucketMap[bucName];
			}
		}

	}
}
