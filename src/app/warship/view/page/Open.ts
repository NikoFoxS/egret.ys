namespace page {
	//负责元素添加，会根据前缀自动创建相应的显示对象。
	class UI {
		bm_bg: ys.Bitmap = null;
		bm_tree: ys.Bitmap = null;
		shape_rec: ys.Shape = null;
		con_toplayer: ys.Container = null;
		txt_name:ys.TextField=null; 
	}

	export class Menu extends ys.UI {
		constructor() {
			super();
		}

		async Start() {
			this.CreateDisplayObject(UI);
			this.Script(Script);
		}

		/**布局 */
		Layout() {
			let data = this.data;

			const ui = this.ui as UI;

			ui.shape_rec.drawRec(100, 100, 0xff0000);
			this.Anchor(ui.shape_rec, 0.5, 1);
			this.Style(ui.shape_rec, 'l:0;t:100')

			// ui.bm_bg.create('headimg_jpg');
			
			const bg = ui.bm_bg;
			bg.create('headimg_jpg');
			this.Style(bg, 't:200;r:0');
			ys.layoutBottom(bg,0);

			const t = ui.txt_name;
			t.text = 'Hello World!';
			t.textColor = 0x000000;
			this.Style(t,'r:0');
		}

		/**界面接口 */
		showHead() {
			this.ui.bm_head;
		}

		hidehead() {

		}
	}

	class Script extends ys.Script {
		constructor() {
			super();
		}

		OnRegister(data?: any) {
			//添加事件
			const page = this.target as Menu;
			const head = page.ui.bm_bg;
			head.touchEnabled = true;

			//移除事件
			this.OnRemove = () => {
				head.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getUserInfo, this);
			}
			const clicker = new behavior.Clicker(head, 10000); //ys.Behavior.Bind(head, behavior.Clicker) as behavior.Clicker;
			clicker.onClick = () => {
				this.getUserInfo();
			}
			//触发服务
			// this.invoker.InvokeService(INVOKE.GET_USER_INFO, {}, SERVICE.USER_INFO);
		}

		private getUserInfo() {
			this.invoker.InvokeService(INVOKE.GET_USER_INFO, {}, NAME.S_USER);
		}

		ListInvoke(): any[] {
			return [INVOKE.ON_GET_USER_INFO];
		}

		OnInvoke(handler: number, data?: any): void {
			switch (handler) {
				case INVOKE.ON_GET_USER_INFO:
					console.log('INVOKE.ON_GET_USER_INFO', data);
					const page = this.target as Menu;
					page.hidehead();
					break;
			}
		}

	}

}