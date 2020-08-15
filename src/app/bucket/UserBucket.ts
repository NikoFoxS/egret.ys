namespace app {
	export class UserBucket extends ys.mvc.Bucket {
		public constructor() {
			super();
		}

		Install(): void {
			this.SetData({ name: 'fox', sex: 'male' }, false);
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
