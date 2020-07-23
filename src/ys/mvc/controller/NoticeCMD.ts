module ys {
	export class NoticeCMD {
		public constructor() {
		}

		public getProxy(ProxyClass) {
			return MVC.GET.getProxy(ProxyClass);
		}

		public sendNotice(name, data?) {
			MVC.GET.sendNotice(name, data);
		}

		public execute(no: ys.Notice) {

		}
	}
}
