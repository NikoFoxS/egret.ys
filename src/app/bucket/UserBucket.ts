namespace app {
	export class UserBucket extends ys.mvc.Bucket {
		public constructor() {
			super();
		}

		Install(): void {
			this.SetData({ name: 'fox', sex: 'male', coins: 200 });
			this.UpdateData();
		}

		Uninstall(): void {

		}
	}

	export declare class UserKV {
		name: string
		sex: string
		coins: number
	}
}
