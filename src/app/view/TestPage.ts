class TestPage extends ys.Page {
	public constructor() {
		super(TestPageMediator);
	}
	public bg: egret.Shape;
	public btn: egret.Shape;
	public label:ys.Label;

	protected uiCreate(): void {
		this.bg = GG.newRect(stageW, stageH, 0xffffff, this);
		this.btn = GG.newRect(200, 80, 0xffff00, this);
		this.label = GG.newLabel(this);
		this.label.textColor = 0xff0000;
		this.label.width = 600;
		this.label.text = '123'
	}

	protected uiLayout(): void {
		GG.layoutMiddleX(this.btn);
		GG.layoutBottom(this.btn, 100);
		this.label.x = 100;
		this.label.y = 200;
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
		const v = this.getView() as TestPage;
		v.btn.touchEnabled = true;
		v.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { 
			this.sendNotice('wahaha');
		}, this);

		v.once(egret.Event.REMOVED_FROM_STAGE,()=>{
			//处理相应的事件移除
		},this);

	}

	protected listenNotice() {
		return ['wahaha'];
	}

	protected onNotice(no: ys.Notice) {
		const v = this.getView() as TestPage;
		if(no.name == 'wahaha')
		{
			console.log(no);
			v.label.text += no.name;

		}
	}
}