// class RotateBehavior extends ys.Behavior {
// 	public constructor() {
// 		super();
// 	}

// 	Install(): void {
// 		this.v.touchEnabled = true;
// 		this.v.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotate, this);
// 	}

// 	Uninstall(): void {
// 		this.v.touchEnabled = false;
// 		this.v.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotate, this);
// 	}

// 	public ang: number = 1;

// 	private rotate() {
// 		this.v.rotation += this.ang;
// 	}
// }