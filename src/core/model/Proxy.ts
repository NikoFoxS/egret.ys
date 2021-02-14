namespace ys {
	export class Proxy extends Model {
		public constructor() {
			super();
		}

		sendNotification(name, data?) {
			ys.Subject.notify(name, data)
		}
	}
}