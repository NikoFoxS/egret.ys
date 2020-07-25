class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	protected uiCreate(): void {
		this.btn = GG.newRect(stageW, stageH, 0x1099bb, this);
		const img = GG.newBitmap('headimg_jpg', this);
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			let m = GG.showModal('click!', 'Ok','Cancel');
			m.addEventListener('select', () => { 
				console.log(m.selectLabel);
			}, this);
		}, this);

		GG.layoutCenter(img);

	}

	protected uiLayout(): void {
	}

	protected onAdded() {

	}

	protected onRemove() {

	}
}

class TestPageMediator extends ys.Mediator {
	constructor(view: ys.View) {
		super(view)
	}

	protected addLogic() {

	}

	protected listenNotice() {
		return [];
	}

	protected onNotice(no: ys.Notice) {

	}
}