module ys {
	export class Service implements IObserver {
		constructor() {
			Subject.registerObserver(this);
			if (ys.Context.isLocalhost) {
				console.log('安装Service::', egret.getQualifiedClassName(this));
			}
		}

		/**发送通知 */
		sendNotification(name, data?: any) {
			Subject.notify(name, data);
		}

		listNotificationInterests(): any[] {
			return [];
		};

		onNotification(name, data): void {

		};
	}
}