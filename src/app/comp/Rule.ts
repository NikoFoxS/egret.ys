module comp {



	class uiStyle extends ys.Style {
		Style() {
			const c = this.owner as Rule;
			const ui = c.ui;

			ui.shape_bg.drawRec(600, 1000, 0xff0000, 20);
			ui.shape_close.drawRec(160, 80, 0xffffff, 20);

			// ui.bm_ship.create('ship_png');
			ui.txt_name.text = 'hello world';
			ui.bm_ship.create('ship_png');

			this.Set(ui.bm_ship, 'c:0;m:0')
			this.Set(ui.shape_close, 'c:0;b:100,sx:1');
			this.Set(this.owner, 'c:0;m:0', 0, 0, ys.Context.stageW, ys.Context.stageH);
		}

	}

	class uiScript extends ys.Script {
		/**脚本被添加 */
		onAdd(data?: any) {

			const c = this.owner as Rule;
			const ui = c.ui;

			this.click(ui.shape_bg, () => {
				ui.txt_name.text = 'hello2'
				ui.shape_close.scaleX = 0.5;
			});

			this.click(ui.shape_close, () => {
				ys.removeDisplayObject(this.owner);
			});
		}

		/**脚本被移除 */
		onRemove() {

		}

		/**列出感兴趣的通知 */
		listNotificationInterests() {
			return [];
		}

		/**处理通知 */
		onNotification(name, data) {

		}
	}

	export class Rule extends ys.Component {
		public constructor() {
			super(600, 1000);
		}

		ui = {
			shape_bg: new ys.Shape,
			shape_close: new ys.Shape,
			bm_ship: new ys.Bitmap,
			txt_name: new ys.TextField,
		}

		public async start() {
			this.addUI(this.ui);
			this.addStyle(uiStyle);
			this.addScript(uiScript);
		}
	}
}