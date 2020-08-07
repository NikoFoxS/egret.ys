class Avatar extends ys.UI {
	public constructor() {
		super();
		let a = GG.newBitmap('headimg_jpg', this);
		GG.setAnchor(a);
		a.scaleX = a.scaleY = 0.5;
		this.addMediator(AvatarMediator);
	}
}

class AvatarMediator extends ys.mvc.Mediator {
	constructor() {
		super();
	}

	Install(): void {
		let v = this.GetView<Avatar>();
		v.touchEnabled = true;
		v.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.MediatorInvoke(Mhandler.avatar_rotate, null);
			setTimeout(function() {
				GG.removeDisplayObject(v);
			}, 1000);
		}, this);
	}
	Uninstall(): void {

	}

	OnInvokeWatch(): any[] {
		return [
			Mhandler.avatar_rotate
		];
	}

	OnInvoke(handler: number | string, data: any): void {
		switch (handler) {
			case Mhandler.avatar_rotate:
				let v = this.GetView<Avatar>();
				v.rotation += 5;
				break;
		}
	}
}