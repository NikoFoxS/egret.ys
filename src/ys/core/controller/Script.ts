module ys {
	export class Script implements IObserver {
		public constructor() {
			if (ys.Context.isLocalhost) {
				console.log('安装Script::', egret.getQualifiedClassName(this));
			}
		}

		$Bind(v: ys.Component, data?: any) {
			this._v = v;
			Subject.registerObserver(this);
			this.onAdd(data);
		}

		$Unbind() {
			Subject.removeObserver(this);
			this.onRemove();
			this._v = null;
		}

		private _v: ys.Component;
		/**脚本绑定的对象 */
		public get owner(): ys.Component {
			return this._v;
		}

		public get data(): ys.IDataGet {
			return ys.Data.GET as ys.IDataGet;
		}


		/**处理点击事件 */
		click(d: egret.DisplayObject, cb: Function, cd: number = 500, event: string = egret.TouchEvent.TOUCH_TAP) {
			d.touchEnabled = true;
			let onclick = (e: egret.TouchEvent) => {
				d.touchEnabled = false;
				if (cd > 0) {
					setTimeout(function () {
						d.touchEnabled = true;
					}, cd);
				}

				e.stopPropagation();
				cb(e);
			};
			d.addEventListener(event, onclick, this);
			d.once(egret.Event.REMOVED_FROM_STAGE, () => {
				d.touchEnabled = false;
				d.removeEventListener(event, onclick, this);
			}, this);
		}

		/**发送通知 */
		sendNotification(name, data?: any) {
			Subject.notify(name, data);
		}

		//----- override
		/**脚本被添加 */
		onAdd(data?: any) {

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
}