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

	export class Application extends ys.Page {
		private static VERSION = '2020-09-22'
		public constructor(cfg: ys.Config) {
			//使用VConsole
			if (window['VConsole']) {
				new window['VConsole']();
			}
			//版本信息
			let hello = 'Egret.ys by NikoFoxS | update:' + Application.VERSION;
			if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				console.log('%c' + hello, 'font-size: 10px;font-weight: bold;text-decoration: underline;');
			} else {
				console.log(hello);
			}
			if (!cfg.log) {
				console.log = () => { };
			}
			super();
			this.cfg = cfg;
		}

		run() {
			this.AddScript(this, script.SetupScript);
			this.AddScript(this, script.Loader);
		}
		public cfg: ys.Config;
	}
}

namespace script {

	export class SetupScript extends ys.Script {
		constructor() {
			super();
		}

		Install(): void {
			let v = this.GetView<ys.Application>();

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

			v.once(egret.Event.ADDED_TO_STAGE, () => {
				const cfg = v.cfg;
				//设置接口为mock数据
				ys.Ajax.mock = cfg.mock;

				//安装服务
				cfg.services && cfg.services.forEach(([k, v]) => {
					ys.Facade.GET.installService(k, v);
				})
				//安装数据bucket
				cfg.buckets && cfg.buckets.forEach(([k, v]) => {
					ys.Facade.GET.installBucket(k, v);
				})

				ys.setup(cfg);

				RES.registerVersionController(new ys.VersionController(cfg.versionFun));
				(async () => {
					await RES.loadConfig(cfg.resourceJSON, cfg.resourceRoot);//微信小游戏，不能带随机数。
					this.InvokeScript('start_load_groups', cfg.groups);
				})();

			}, this);
		}
		Uninstall(): void {
		}
	}

	export class Loader extends ys.Script {
		public constructor() {
			super();
		}

		Install(): void {

		}
		Uninstall(): void {
		}
		/**列出需要关注的invoke */
		ListInvoke(): any[] {
			return ['start_load_groups'];
		}
		/**处理 invoke*/
		OnInvoke(handler: number | string, data: any): void {
			console.log('invoke',handler)
			if (handler == 'start_load_groups') {
				(async () => {
					const groups: string[] = data;
					const page = this.GetView<ys.Page>();
					var i = 0;
					var len = groups.length;
					if (len) {
						while (i < len) {
							await this.loadGroup(groups[i]);
							i++;
						}
						page.Init();
					} else {
						page.Init();
					}
				})();
			}
		}

		async loadGroup(name) {
			let page = this.GetView<ys.Page>();
			try {
				if (RES.isGroupLoaded(name)) {
					page.OnLoadEnd(name);
				} else {
					page.OnLoadStart(name);
					await RES.loadGroup(name, 9999, page);
					page.OnLoadEnd(name);
				}

			} catch (e) {
				console.warn('加载异常！');
			}
		}


	}
}