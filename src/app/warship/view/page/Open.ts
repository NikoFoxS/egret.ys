namespace page {

	class Layout extends ys.Layout {
		public bm_headimg_jpg: ys.Bitmap = null;
		public shape_bg: ys.Shape = null;
		public bm_bg: ys.Bitmap = null;

		async OnCreate(data?: any) {

			const head = this.bm_headimg_jpg;
			head.scaleX = head.scaleY = 0.5;
			head.anchorOffsetX = 100;
			head.anchorOffsetY = 100;
			// this.anchor(head);
			this.Style(head, 'c:0,m:0');

			const bg = this.bm_bg;
			bg.srcAsync('resource/warship/ship.png').then(() => {
				this.Style(bg, 'r:0');
			});

		}

		sayHello() {
			this.hideHead();
		}

		showHead() {
			const head = this.bm_headimg_jpg;
			this.Anchor(head, 0.5, 0.5, true);
			this.Scale(head, 0);
			ys.Behavior.Bind(head, behavior.ScaleShow, { time: 600, scale: 1 });
			// this.anchor(head, 0.5, 0.5,true);
			// egret.Tween.get(head).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut);
		}

		hideHead() {
			const head = this.bm_headimg_jpg;
			this.Anchor(head, 0.5, 0.5, true);
			// this.BindBehavior(head, behavior.ScaleHide, { time: 600, scale: 0 });
			ys.Behavior.Bind(head, behavior.ScaleHide, { time: 600, scale: 0 });
		}

	}


	class Script extends ys.Script {
		constructor() {
			super();
		}


		OnRegister(data?: any) {
			//添加事件
			const v = this.target as Layout;
			const head = v.bm_headimg_jpg;
			head.touchEnabled = true;
			// head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getUserInfo, this);

			//移除事件
			this.OnRemove = () => {
				head.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getUserInfo, this);
			}
			const clicker = new behavior.Clicker(head,10000); //ys.Behavior.Bind(head, behavior.Clicker) as behavior.Clicker;
			clicker.onClick = () => {
				this.getUserInfo();
			}

			//
			v.showHead();

			//触发服务
			// this.invoker.InvokeService(INVOKE.GET_USER_INFO, {}, SERVICE.USER_INFO);
		}

		private getUserInfo() {
			this.invoker.InvokeService(INVOKE.GET_USER_INFO, {}, SERVICE.USER_INFO);
		}


		ListInvoke(): any[] {
			return [INVOKE.ON_GET_USER_INFO];
		}

		OnInvoke(handler: number, data?: any): void {
			switch (handler) {
				case INVOKE.ON_GET_USER_INFO:
					console.log('INVOKE.ON_GET_USER_INFO', data);
					break;
			}
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



