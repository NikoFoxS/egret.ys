namespace bucket {
	export class UserInfo extends ys.Bucket {
		public constructor() {
			super();
		}

		OnRegister() {
			this.SetData({ name: 'fox', sex: 'male', coins: 200 },true);
			// this.UpdateData();
		}

		OnRemove() {

		}

	}

	export declare class UserSchema {
		name: string
		sex: string
		coins: number
		shipType: number
	}
}
