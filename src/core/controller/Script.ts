module ys {
	export class Script extends ys.Observer {
		public constructor() {
			super();
		}

		public owner: any;
		public view: any;

		/**发送通知 */
		sendNotification(name, data?: any) {
			ys.Subject.notify(name, data);
		}

		/**列出感兴趣的通知 */
		listNotificationInterests() {
			return [];
		}

		/**处理通知 */
		onNotification(name, data) {

		}

		/**脚本被添加 */
		onAdded() {

		}

		/**脚本被移除 */
		onRemove() {

		}



	}
}