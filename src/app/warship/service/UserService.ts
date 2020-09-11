namespace app {
	export class UserService extends ys.mvc.Service {
		public constructor() {
			super();
		}

		OnInvoke(handler: number | string, data: any): void {
			switch (handler) {
				case CONST.SERVICE_GET_USER_DATA:
					this.getInfo(data);
					break;
			}
		}

		getInfo(data) {
			let a = new ys.Ajax();
			const api = ``;
			a.get(api, null, () => {
				let b = this.GetBucket('user');
				if (b) {
					b.SetData({ name: 'username', sex: 'haha', age: 25 });
					b.UpdateData();
				}
			})
		}

		login()
		{
			
		}
	}
}