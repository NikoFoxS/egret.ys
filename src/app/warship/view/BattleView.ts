
namespace app {
	/**界面TestUI*/
	export class TestUI extends ys.View {

		public bm_headimg_jpg: ys.Bitmap = null;
		public shape_rec: ys.Shape = null;
		public txt_name: ys.TextField = null;
		public con_name: ys.Container = null;

		constructor() {
			super();
		}

		OnStart() {
			//构建界面
			this.createUI(this, () => {

				this.shape_rec.drawRec(100,100,0xff0000)
				this.txt_name.text = 'Hello world!';
				
				//添加界面管理器
				this.addMediator(BattleViewMediator);
			}, this);
		}

	}

	/**界面管理器*/
	export class TestUIMediator extends ys.mvc.Mediator {
		constructor() {
			super();
		}
		private v: TestUI;
		/**当被按照*/
		Install(): void {
			this.v = this.GetView<TestUI>();
			//添加界面管理逻辑
		}
		/**当被卸载*/
		Uninstall(): void {
		}
		/**列出需要关注的invoke */
		ListInvoke(): any[] {
			return [];
		}
		/**处理 invoke*/
		OnInvoke(handler: number | string, data: any): void {
			switch (handler) {

			}
		}
	}
}


namespace app {
	/**界面BattleView*/
	export class BattleView extends ys.View {

		constructor() {
			super();
		}

		OnStart() {
			const ui = new TestUI();
			this.addChild(ui);

		}
	}

	/**界面管理器*/
	export class BattleViewMediator extends ys.mvc.Mediator {
		constructor() {
			super();
		}
		private v: BattleView;
		/**当被按照*/
		Install(): void {
			this.v = this.GetView<BattleView>();
			//添加界面管理逻辑
		}
		/**当被卸载*/
		Uninstall(): void {
		}
		/**列出需要关注的invoke */
		ListInvoke(): any[] {
			return [];
		}
		/**处理 invoke*/
		OnInvoke(handler: number | string, data: any): void {
			switch (handler) {

			}
		}
	}
}