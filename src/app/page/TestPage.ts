class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	OnStart() {
		// var a = new Avatar();
		// this.addChild(a);
		// a.x = stageHalfW;
		// a.y = 100;

		// var a = new Avatar();
		// this.addChild(a);
		// a.x = stageHalfW;
		// a.y = 400;

		// var a = new Avatar();
		// this.addChild(a);
		// a.x = stageHalfW;
		// a.y = 800;
		let a = GG.newBitmap('headimg_jpg', this);
		a.x = 100;
		a.y = 100;
		let b = this.bindBehavior(a, DragerBehavior, { name: 'Drager' });
		b.once('release', () => {
			// GG.removeDisplayObject(a);
		}, this)

		let rb = this.bindBehavior(a, RotateBehavior, { name: 'rotate', ang: 10 });
	}
	headimg: egret.Bitmap;

	public txt: ys.Label;

	OnAdd() {

	}

	OnRemove() {

	}



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

	OnInvokeWatch(): any[] {
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