namespace ys {
	let logTxt: egret.TextField;

	export function log(...arg) {
		if (stage) {
			if (!logTxt) {
				logTxt = new egret.TextField();
				logTxt.background = true;
				logTxt.width = 200;
				logTxt.wordWrap = true;
				logTxt.multiline = true;
				logTxt.backgroundColor = 0x000000;
				logTxt.size = 15;
				logTxt.lineSpacing = 5;
				logTxt.touchEnabled = true;
				logTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { logTxt.alpha == 1 ? logTxt.alpha = 0 : logTxt.alpha = 1 }, null);
			}
			stage.addChild(logTxt);
			var s = arg.join(',');
			logTxt.text += s + '\n';
		}
	}

	export function logClear() {
		logTxt && (logTxt.text = '');
	}
}

class Application extends ys.UI implements RES.PromiseTaskReporter {
	private static VERSION = '2020.08.06'
	public constructor(cfg: ys.Config) {
		//使用VConsole
		if (window['VConsole']) {
			new window['VConsole']();
		}
		//版本信息
		console.log('egret.ys: ' + Application.VERSION + " https://github.com/NikoFoxS/egret.ys.git" + "");
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
			cfg.services && cfg.services.forEach(({k,v}) => {
				ys.mvc.Facade.GET.installService(k,v);
			})
			//安装数据bucket
			cfg.buckets && cfg.buckets.forEach(({k,v}) => {
				ys.mvc.Facade.GET.installBucket(k,v);
			})

			if (!GG.setup(v, cfg)) return;

			RES.registerVersionController(new ys.VersionController(cfg.versionFun));
			GG.Loader.setRespath(cfg.resourceRoot);
			GG.Loader.setup(async () => {
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

			}, this, cfg.resourceJSON);

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