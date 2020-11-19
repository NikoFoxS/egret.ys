module page {

	class uiStyle extends ys.Style {
		Style() {
			const c = this.owner as Menu;
			c.ui.shape_bg.drawRec(ys.Context.stageW, ys.Context.stageH, 0xffff00);
		}
	}

	class uiScript extends ys.Script {

		constructor() {
			super()
		}

		/**脚本被添加 */
		onAdd(data?: any) {
			const c = this.owner as Menu;
			this.click(c.ui.shape_bg, () => {
				this.sendNotification(NOTICE.GET_USER_INFO, { id: 123 });
			})
		}

		/**脚本被移除 */
		onRemove() {

		}

		/**列出感兴趣的通知 */
		listNotificationInterests() {
			return [NOTICE.ON_GET_USER_INFO];
		}

		/**处理通知 */
		onNotification(name, data) {
			switch (name) {
				case NOTICE.ON_GET_USER_INFO:
					console.log(data);
					ys.showPage(page.Play);
					break;
			}
		}
	}

	export class Menu extends ys.Page {
		public constructor() {
			super();
		}

		ui = {
			shape_bg: new ys.Shape,
		}

		public async start() {

			this.addUI(this.ui);
			this.addStyle(uiStyle);
			this.addScript(uiScript);
		}


	}


}