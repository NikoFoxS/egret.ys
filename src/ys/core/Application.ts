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

	export class Application extends ys.UI implements RES.PromiseTaskReporter {
		private static VERSION = '20200815'
		public constructor(cfg: ys.Config) {
			//使用VConsole
			if (window['VConsole']) {
				new window['VConsole']();
			}
			//版本信息
			let hello = 'Egret.ys by NikoFoxS | update:' + Application.VERSION;
			if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				console.log('%c' + hello, 'font-size: 10px;font-weight: bold;text-decoration: underline;');
			} else {
				console.log(hello);
			}
			if (!cfg.log) {
				console.log = () => { };
			}
			super();
			this.cfg = cfg;
			this.addMediator(ApplicationMediator);
		}
		public cfg: ys.Config;
		onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
			this.onGroupProgress(current, total, resItem);
		}
		//--------------------------------
		onGroupStart(name: string): void {

		}
		onGroupProgress(loaded: number, total: number, resItem: RES.ResourceInfo | undefined): void {

		}
		onGroupLoaded(name: string): void {

		}


	}


	class ApplicationMediator extends ys.mvc.Mediator {
		constructor() {
			super();
		}

		Install() {
			let v = this.GetView<Application>();

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
					ys.mvc.Facade.GET.installService(k, v);
				})
				//安装数据bucket
				cfg.buckets && cfg.buckets.forEach(([k, v]) => {
					ys.mvc.Facade.GET.installBucket(k, v);
				})

				ys.setup(cfg);

				RES.registerVersionController(new ys.VersionController(cfg.versionFun));
				(async () => {

					await RES.loadConfig(cfg.resourceJSON, cfg.resourceRoot);//微信小游戏，不能带随机数。
					var i = 0;
					var len = v.cfg.groups.length;
					if (len) {
						while (i < len) {
							await this.loadGroup(cfg.groups[i]);
							i++;
						}
					} else {
						v.onGroupLoaded('');
					}
				})();

			}, this);

		}

		async loadGroup(name) {
			try {
				let v = this.GetView<Application>();
				if (RES.isGroupLoaded(name)) {
					v.onGroupLoaded(name);
				} else {
					v.onGroupStart(name);
					await RES.loadGroup(name, 9999, v);
					v.onGroupLoaded(name);
				}

			} catch (e) {
				console.warn(e);
			}
		}

	}
}

