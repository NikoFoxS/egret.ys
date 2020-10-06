namespace service {
	export class UserInfo extends ys.Service {
		public constructor() {
			super();
		}

		OnRegister() {

		}

		OnRemove() {

		}

		OnInvoke(handler: number | string, data: any): void {
			// throw new Error('need override OnInvoke()')
		}

		// OnInvoke(handler: number | string, data: any): void {
		// 	switch (handler) {
		// 		case CONST.SERVICE_GET_USER_DATA:
		// 			this.getInfo(data);
		// 			break;
		// 	}
		// }

		// getInfo(data) {
		// 	let a = new ys.Ajax();
		// 	const api = ``;
		// 	a.get(api, null, () => {
		// 		let b = this.invoker.GetBucket('');
		// 		if (b) {
		// 			b.SetData({ name: 'username', sex: 'haha', age: 25 });
		// 			b.UpdateData();
		// 		}
		// 	})
		// }

		// login()
		// {
			
		// }
	}
}