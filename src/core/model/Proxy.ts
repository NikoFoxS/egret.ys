namespace ys {
	export class Proxy extends Model {
		public constructor() {
			super();
		}

		notify(name, data?) {
			ys.Subject.notify(name, data)
		}
	}
}