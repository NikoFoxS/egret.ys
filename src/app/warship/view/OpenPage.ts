class OpenPage extends ys.Page {
	public constructor() {
		super();
		this.Init();
	}

	public bm_headimg_jpg: ys.Bitmap = null;
	public cl_RecUI: RecUI = null;

	OnStart() {
		//layout
		const head = this.bm_headimg_jpg;
		const rec = this.cl_RecUI;
		ys.layoutRight(head, 0);
		ys.layoutTop(rec, 100);
		ys.layoutLeft(rec, 100);
		//add script
		this.AddScript(this, Clicker);
		this.AddScript(this.cl_RecUI, ClickerRight);
	}

	OnLoadStart(name: string) {

	}

	OnLoadProgress(current: number, total: number) {

	}

	OnLoadEnd(name: string) {

	}
}

class Clicker extends ys.Script {
	constructor() {
		super();
	}

	Install(): void {
		let v = this.GetView<OpenPage>();
		v.bm_headimg_jpg.touchEnabled = true;
		v.bm_headimg_jpg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			v.bm_headimg_jpg.y += 10;
			this.InvokeScript('right',null);
		}, this);
	}
	Uninstall(): void {

	}
	/**列出需要关注的invoke */
	ListInvoke(): any[] {
		return [];
	}
	/**处理 invoke*/
	OnInvoke(handler: number | string, data: any): void {

	}
}

class RecUI extends ys.UI {
	constructor() {
		super();
		this.Init();
	}

	public shape_ball: ys.Shape = null;

	OnStart() {
		this.shape_ball.drawCirle(30, 0xff0000);
	}
}

class ClickerRight extends ys.Script {
	constructor() {
		super();
	}

	Install(): void {
		let v = this.GetView<RecUI>();
		v.touchEnabled = true;
		v.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			v.x += 5;
		}, this);
	}
	Uninstall(): void {

	}
	/**列出需要关注的invoke */
	ListInvoke(): any[] {
		return ['right'];
	}
	/**处理 invoke*/
	OnInvoke(handler: number | string, data: any): void {
		switch (handler) {
			case 'right':
				let v = this.GetView<RecUI>();
				v.x += 5;
				break;
		}
	}
}