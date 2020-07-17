class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	protected uiCreate(): void {
		// this.bg = GG.newRect(stageW, stageH, 0xff00ff, this);
		this.btn = GG.newRect(stageW, stageHalfH, 0xffff00, this);

		// RES.getResByUrl('resource/assets/bg.jpg', (tex: egret.Texture) => {
		// 	var bm = new egret.Bitmap(tex);
		// 	bm.y = 300;
		// 	this.addChild(bm);
		// })

		const img = GG.newBitmap('headimg_jpg', this);
		img.touchEnabled = true;
		img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { 
			tb.log('click?')
			// tb.getAuthUserInfo((info)=>{
			// 	tb.log(JSON.stringify(info));
			// },this)

			tb.addToCart();
			
		}, this);

	}

	protected uiLayout(): void {
		// GG.layoutMiddleX(this.btn);
		// GG.layoutBottom(this.btn, 100);
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