class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	protected uiCreate(): void {
		this.btn = GG.newRect(stageW, stageHalfH, 0xffff00, this);
		const img = GG.newBitmap('headimg_jpg', this);
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { 
		}, this);

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
		//添加界面逻辑
		//通过sendNotice发送通知
		//通过getProxy获取数据
		//通过listenNotice侦听感兴趣的通知
		//通过onNotice处理感兴趣的通知
	}

	protected listenNotice() {
		return [];
	}

	protected onNotice(no: ys.Notice) {

	}
}