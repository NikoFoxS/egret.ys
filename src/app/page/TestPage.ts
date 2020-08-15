class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	OnStart() {

		// ys.SOLO.GET.addEventListener(ys.SOLO.ON_CONNNECT, () => {
		// 	const playerInfo = {
		// 		name: "user"+GG.randomInt(1000,9999),
		// 		customPlayerStatus: 1,
		// 		customProfile: "https://xxx.com/icon.png",
		// 	};

		// 	ys.SOLO.GET.match(playerInfo, 2, '1');
		// }, this);
		// ys.SOLO.GET.addEventListener(ys.SOLO.ON_MATCH_OK, () => {

		// }, this);
		// ys.SOLO.GET.setup('' + GG.randomInt(1000, 9999), 'obg-krwrque4', '6354b5a0d281657f3c796dbb842500b97280123e');
		// ys.SOLO.GET.connect('krwrque4.wxlagame.com');
	}
	headimg: egret.Bitmap;
	public txt: ys.Label;


}

class TestPageMediator extends ys.mvc.Mediator {
	constructor() {
		super()
	}

	Install(): void {
		let v = this.GetView<TestPage>();
		let img = v.headimg;
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			let m = GG.showModal('click!', 'Ok', 'Cancel');
			m.addEventListener('select', () => {
				// console.log(m.selectLabel);
				this.ServiceInvoke(SHandler.user_get_info, {}, 'user')
			}, this);
		}, this);
	}
	Uninstall(): void {

	}

	OnInvokeList(): any[] {
		return [
			Mhandler.update_user_info
		];
	}

	OnInvoke(handler: number, data: any): void {
		switch (handler) {
			case Mhandler.update_user_info:
				let buc = this.BucketGet('user');
				let vo = buc.data as UserData
				let v = this.GetView<TestPage>();
				v.txt.text = vo.name + " - " + vo.sex + " - " + vo.coins;
				console.log('更改项', data);
				break;
		}
	}
}
