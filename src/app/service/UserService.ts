namespace app {
	export class UserService extends ys.mvc.Service {
		public constructor() {
			super();
		}

		OnInvoke(handler: number | string, data: any): void {
			switch (handler) {
				case INVOKE.SERVICE_GET_USER_DATA:
					this.getInfo(data);
					break;
			}
		}

		getInfo(data) {
			let a = new ys.Ajax();
			a.get('', null, () => {
				let b = this.BucketGet('user');
				if (b) {
					b.SetData({ name: 'username', sex: 'haha', age: 25 }, INVOKE.HANDLER_UPDATE_USER_DATA);
				}
			})
		}
	}
}