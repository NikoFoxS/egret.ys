module page {

	const ui = {
		shape_bg: new ys.Shape,
	}

	class uiStyle extends ys.Style {
		Style() {
			ui.shape_bg.drawRec(ys.Context.stageW, ys.Context.stageH, 0xccccff);
		}
	}

	class uiScript extends ys.Script {

		/**脚本被添加 */
		onAdd(data?: any) {
			this.click(ui.shape_bg, () => {
				// ys.showPage(page.Play);
				const pop = new comp.Rule();
				pop.start();
				ys.popUp(pop);
			})
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

	export class Play extends ys.Page {
		public constructor() {
			super();
		}

		public async start() {
			this.addUI(ui);
			this.addStyle(uiStyle);
			this.addScript(uiScript);
		}
	}
}