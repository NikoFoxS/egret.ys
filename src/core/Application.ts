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


	export class Application extends egret.DisplayObjectContainer implements ys.LoadingReporter, RES.PromiseTaskReporter {
		private static VERSION = '2021-02-10'
		public constructor() {
			super();
		}

		run(cfg: ys.Config) {
			//使用VConsole
			if (window && window['VConsole']) {
				new window['VConsole']();
			}
			//版本信息
			let hello = 'Egret.ys by NikoFoxS | update:' + Application.VERSION;
			console.log(hello);
			if (!cfg.log) {
				console.log = () => { };
			}

			egret.lifecycle.addLifecycleListener((context) => {
				context.onUpdate = () => {
				}
			})
			egret.lifecycle.onPause = () => {
				// egret.ticker.pause();
			}
			egret.lifecycle.onResume = () => {
				// egret.ticker.resume();
			}

			ys.setup(cfg);

			RES.registerVersionController(new ys.VersionController(cfg.versionFun));
			(async () => {
				await RES.loadConfig(cfg.resourceJSON, cfg.resourceRoot);//微信小游戏，不能带随机数。
				await this.load(cfg.groups);
			})();

		}

		async load(groups: string[]) {
			var i = 0;
			var len = groups.length;
			if (len) {
				while (i < len) {
					await this.loadGroup(groups[i]);
					i++;
				}
			} else {
				this.OnLoadEnd('');
			}
		}

		async loadGroup(name) {
			try {
				if (RES.isGroupLoaded(name)) {
					this.OnLoadEnd(name);
				} else {
					this.OnLoadStart(name);
					await RES.loadGroup(name, 9999, this);
					this.OnLoadEnd(name);
				}

			} catch (e) {
				console.warn('加载异常！');
			}
		}


		onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
			this.OnLoadProgress(current, total);
		}

		OnLoadStart(name: string) {

		}

		OnLoadProgress(current: number, total: number) {

		}

		OnLoadEnd(name: string) {

		}


	}
}