namespace service {
	class UserMock extends ys.Mock {
		mock(api, data): any {
			let res;
			switch (api) {
				case 'https://a.h5sun.com/getuser/':
					res = {
						nick: "niko",
						score: 100
					}

					break;
			}

			if (res) {
				console.log('Mock::', api, res);
			}
			return res;
		}
	}
	export class UserInfo extends ys.Service {
		public constructor() {
			super();
		}

		OnRegister() {
			ys.Ajax.setupMock(new UserMock());
			console.log("UserInfo OnRegister")
		}

		OnRemove() {

		}

		OnInvoke(handler: any, data: any): void {
			// throw new Error('need override OnInvoke()')
			console.log('OnInvoke::', handler, data)
			switch (handler) {
				case INVOKE.GET_USER_INFO:
					this.getUserInfo(data);
					break;
			}
		}

		private getUserInfo(data) {

			let a = new ys.Ajax();
			a.post('https://a.h5sun.com/getuser/', {}, (error, res) => {
				console.log(a.responseJson);
			})
			this.invoker.InvokeScript(INVOKE.ON_GET_USER_INFO, { name: 'niko' });
		}
		
	}
}