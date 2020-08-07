class UserService extends ys.mvc.Service {
	public constructor() {
		super();
	}

	OnInvoke(handler: number | string, data: any): void {
		switch (handler) {
			case SHandler.user_get_info:
				this.getInfo(data);
				break;
		}
	}

	getInfo(data) {
		let a = new ys.Ajax();
		a.get('', null, () => {
			let b = this.BucketGet('user');
			if (b) {
				b.SetData({ name: 'username',sex:'haha', age: 25 },Mhandler.update_user_info);
			}
		})
	}
}