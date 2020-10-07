namespace page {

	class Layout extends ys.UILayout {
		public bm_headimg_jpg: ys.Bitmap = null;
		public shape_bg: ys.Shape = null;
		public bm_bg: ys.Bitmap = null;

		async OnCreate(data?: any) {
			// this.shape_bg.drawRec(ys.Context.STAGE_W,600,0xff0000);
			// this.bm_bg.y = 500;
			// this.bm_bg.texture = this.bm_headimg_jpg.texture;

			const head = this.bm_headimg_jpg;
			head.scaleX = head.scaleY = 0.5;
			head.anchorOffsetX = 100;
			head.anchorOffsetY = 100;
			// this.anchor(head);
			this.layout(head, 'c:0,m:0');

			const bg = this.bm_bg;
			bg.srcAsync('resource/warship/ship.png').then(() => {
				this.layout(bg, 'r:0');
			});
			// bg.src = 'resource/warship/ship.png';
			// bg.load('resource/warship/ship.png', () => {
			// 	this.layout(bg, 'r:0');
			// }, this);



		}

		sayHello() {
			// this.shape_bg.y = 300;
			this.hideHead();
		}

		showHead() {
			const head = this.bm_headimg_jpg;
			this.anchor(head, 0.5, 0.5, true);
			this.scale(head, 0);
			this.bindScript(head, script.ScaleShow, { time: 600, scale: 1 });
			// this.anchor(head, 0.5, 0.5,true);
			// egret.Tween.get(head).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut);
		}

		hideHead() {
			const head = this.bm_headimg_jpg;
			this.anchor(head, 0.5, 0.5, true);
			this.bindScript(head, script.ScaleHide, { time: 600, scale: 0 });
			// egret.Tween.get(head).to({ scaleX: 0.5, scaleY: 0.5 }, 600, egret.Ease.backIn);
		}

	}


	class Script extends ys.UIScript {
		constructor() {
			super();
		}

		ListInvoke(): any[] {
			return [INVOKE.ON_GET_USER_INFO];
		}

		OnInvoke(handler: number, data?: any): void {
			switch (handler) {
				case INVOKE.ON_GET_USER_INFO:
						
					break;
			}
		}

		OnRegister(data?: any) {
			const v = this.target as Layout;
			const head = v.bm_headimg_jpg;
			head.touchEnabled = true;
			head.addEventListener(egret.TouchEvent.TOUCH_TAP, v.hideHead, v);
			v.showHead();
			this.invoker.InvokeScript(INVOKE.GET_USER_INFO, {});
		}

		OnRemove() {

		}

	}

	export class Open extends ys.UI {
		public constructor() {
			super();
		}
		async Start(data?: any) {
			this.setup(Layout, Script, data);
		}

	}
}



