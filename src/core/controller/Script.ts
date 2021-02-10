module ys {
	export class Script extends ys.Observer {
		public constructor() {
			super();
		}

		
		private _owner : any;
		public get owner() : any {
			return this._owner;
		}
		public set owner(v : any) {
			this._owner = v;
		}
		


		/**发送通知 */
		sendNotification(name, data?: any) {
			// ys.Subject.GET.notify(name, data);
		}

		//----- override
		/**脚本被添加 */
		onAdded(data?: any) {

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