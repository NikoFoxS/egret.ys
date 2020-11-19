module service {
	export class API extends ys.Service {
		public constructor() {
			super();
		}

		public get data() {
			return ys.Data.GET as ys.IDataSet;
		}

		listNotificationInterests(): any[] {
			return [NOTICE.GET_USER_INFO];
		};

		onNotification(name, data): void {
			switch (name) {
				case NOTICE.GET_USER_INFO:
					this.getUserInfo();
					break;
			}
		};

		private async getUserInfo() {
			const res = await this.call('', {});
			this.data.setData({ userInfo: {} })
			this.sendNotification(NOTICE.ON_GET_USER_INFO, res);
		}

		async call(api, data) {
			ys.Tips.showLoading('');
			return new Promise((resolve, reject) => {
				setTimeout(function () {
					resolve({ code: 0, data: {}, msg: '' });
					ys.Tips.hideLoading();
				}, 1000);

			})
		}

	}
}