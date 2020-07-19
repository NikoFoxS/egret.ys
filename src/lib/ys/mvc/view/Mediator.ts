/**
 * 负责界面元素的管理
 */
module ys {

	export class Mediator {
		public constructor(view: egret.DisplayObject) {
			this._view = view;
			MVC.GET.evt.addEventListener(MVC.MVC_NOTICE, this._onNotice, this);
			view.once(egret.Event.REMOVED_FROM_STAGE, () => {
				MVC.GET.evt.removeEventListener(MVC.MVC_NOTICE, this._onNotice, this);
			}, this);
		}
		public name: string = 'Mediator';
		private _view: any;
		public getView() {
			return this._view;
		}

		private _onNotice(e: egret.Event) {
			var name = e.data.name;
			if (name) {
				if (name == 'resize') {
					const v: ys.Page = this.getView();
					v && v.resize && v.resize();
					return;
				}
				var list = this.listenNotice();
				if (list.indexOf(name) != -1) {
					var data = e.data.data;
					var no = new Notice();
					no.name = name;
					no.data = data;
					console.log('[' + this.name + ']:处理通知->', name, data)
					this.onNotice(no);
				}
			}
		}

		protected sendNotice(name, data?) {
			console.log('[' + this.name + ']:发送通知->', name, data);
			MVC.GET.sendNotice(name, data);
		}

		protected getProxy(ProxyClass) {
			return MVC.GET.getProxy(ProxyClass);
		}

		protected registerProxy(ProxyClass) {
			MVC.GET.registerProxy(ProxyClass);
		}

		protected registerCommand(commandClass) {
			MVC.GET.registerCommand(commandClass);
		}

		public $addLogic() {
			this.addLogic();
		}

		/**当ui创建完毕，会触发该方法 */
		//添加界面逻辑
		//通过sendNotice发送通知
		//通过getProxy获取数据
		//通过listenNotice侦听感兴趣的通知
		//通过onNotice处理感兴趣的通知
		protected addLogic() {
		}

		protected listenNotice() {
			return [];
		}

		protected onNotice(no: ys.Notice) {

		}
	}
}