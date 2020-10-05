namespace ys {
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

	export interface LoadingReporter {
		OnLoadStart(name: string);
		OnLoadProgress(current: number, total: number);
		OnLoadEnd(name: string);
	}

	export class Application extends ys.UI implements LoadingReporter, RES.PromiseTaskReporter {
		private static VERSION = '2020-10-04'
		public constructor() {
			super();
		}

		run(cfg: ys.Config) {
			//使用VConsole
			if (window['VConsole']) {
				new window['VConsole']();
			}
			//版本信息
			let hello = 'Egret.ys by NikoFoxS | update:' + Application.VERSION;
			console.log(hello);
			if (!cfg.log) {
				console.log = () => { };
			}
			this.InitScript(SetupScript, cfg);
			this.InitScript(LoaderScript, cfg);
		}


		onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
			this.OnLoadProgress(current, total)
		}

		OnLoadStart(name: string) {

		}

		OnLoadProgress(current: number, total: number) {

		}

		OnLoadEnd(name: string) {

		}
	}
}