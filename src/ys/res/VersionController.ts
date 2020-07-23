module ys {
	export class VersionController implements RES.IVersionController {

		constructor(fun) {
			this.fun = fun;
		}
		private fun: Function;

		// 在游戏开始加载资源的时候就会调用这个函数
		init(): Promise<any> {
			return Promise.resolve()
		}

		//在游戏运行时，每个资源加载url都要经过这个函数
		getVirtualUrl(url: string) {
			var u = url + "";
			if (this.fun) {
				u = this.fun(u);
			}
			return u;

		}
	}
}