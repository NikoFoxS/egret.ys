namespace app {
	/**界面BattleView*/
	export class BattleView extends ys.View {

		public img_headimg_jpg: ys.Bitmap = null;
		public txt_name: ys.TextField = null;
		public rec_box: egret.Shape = null;

		constructor() {
			super('');
		}



		OnStart() {
			//构建界面
			setTimeout(() => {
				Object.getOwnPropertyNames(this).forEach(val => {
					console.log(val);
					if (val.indexOf('img_') == 0) {
						this[val] = ys.newBitmap(val.replace('img_', ''), this);
					}
				})
			}, 1);


			//添加界面管理器
			this.addMediator(BattleViewMediator);

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