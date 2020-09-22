namespace app {
	export class UserBucket extends ys.Bucket {
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

	export declare class UserSchema {
		name: string
		sex: string
		coins: number
		shipType: number
	}
}
