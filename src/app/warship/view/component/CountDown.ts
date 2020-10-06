// namespace component
// {
//     class View extends ys.UIView {
// 		public bm_headimg_jpg: ys.Bitmap = null;
// 		public shape_bg: ys.Shape = null;
// 	}

// 	class Style extends ys.UIStyle {
// 		private v: any;
// 		Init(view) {
// 			this.v = view;
// 			const v = this.v as View;
// 			v.shape_bg.drawRec(100, 100, 0xff0000);

// 			const head = v.bm_headimg_jpg;
// 			ys.layoutRight(head, 200);
// 		}

// 		public bottomHead() {
// 			const v = this.v as View;
// 			ys.layoutBottom(v.bm_headimg_jpg, 0);
// 		}

// 		public showRule() {
// 		}

// 	}

// 	class Script extends ys.Script {
// 		constructor() {
// 			super();
// 		}

// 		Install(): void {
// 			let ui = this.GetView() as ys.UI;
// 			const v = ui.view as View;
// 			v.bm_headimg_jpg.touchEnabled = true;
// 			// v.bm_headimg_jpg.alpha = 0.01;
// 			v.bm_headimg_jpg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
// 				// v.bm_headimg_jpg.y += 10;
// 				const style = ui.style as Style;
// 				style.bottomHead();

// 			}, this);
// 		}
// 		Uninstall(): void {

// 		}
// 		/**列出需要关注的invoke */
// 		ListInvoke(): any[] {
// 			return [];
// 		}
// 		/**处理 invoke*/
// 		OnInvoke(handler: number | string, data: any): void {

// 		}
// 	}

// 	export class CountDown extends ys.UI {
// 		public constructor(time:number) {
// 			super();
// 			this.Start();
// 		}

// 		async Start(data?:any) {
// 			// ys.showLoading('');
// 			// await RES.loadGroup('preload');
// 			// ys.hideLoading();
// 			//view
// 			this.InitView(View);
// 			//layout
// 			this.InitStyle(Style);
// 			//script
// 			this.InitScript(Script, data);
// 		}

// 	}
// }