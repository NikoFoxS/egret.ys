// class DragerBehavior extends ys.Behavior {
// 	public constructor() {
// 		super();
// 	}

// 	Install(): void {
// 		let d = this.v;
// 		d.touchEnabled = true;
// 		d.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkTouch, this);
// 	}

// 	Uninstall(): void {
// 		let d = this.v;
// 		d.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkTouch, this);
// 	}
// 	private drag: boolean;
// 	private tx: number;
// 	private ty: number;
// 	private checkTouch(e: egret.TouchEvent) {
// 		const type = e.type;
// 		let display = this.v;
// 		if (type == egret.TouchEvent.TOUCH_BEGIN) {
// 			this.tx = e.stageX;
// 			this.ty = e.stageY;
// 			display.parent.addChild(display)
// 			ys.Context.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkTouch, this);
// 			ys.Context.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.checkTouch, this);
// 		} else if (type == egret.TouchEvent.TOUCH_MOVE) {
// 			const dx = e.stageX - this.tx;
// 			const dy = e.stageY - this.ty;
// 			display.x += dx;
// 			display.y += dy;
// 			this.tx = e.stageX;
// 			this.ty = e.stageY;
// 		} else if (type == egret.TouchEvent.TOUCH_END) {
// 			ys.Context.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkTouch, this);
// 			ys.Context.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.checkTouch, this);
// 			this.dispatchEventWith('release');
// 		}
// 	}

// }