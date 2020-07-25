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

class Application extends ys.View {
	private static VERSION = '1.0.0'
	public constructor(cfg: Config, loading: ys.LoadingReporter) {
		//使用VConsole
		if (window['VConsole']) {
			new window['VConsole']();
		}
		//版本信息
		console.log('egret.ys: ' + Application.VERSION + " https://github.com/NikoFoxS/egret.ys.git" + "");

		super();
		this.addMediator(ApplicationMediator);
		this.cfg = cfg;
		this.loading = loading;
	}
	public cfg: Config;
	public loading: ys.LoadingReporter;
	protected uiCreate(): void {

	}
	protected uiLayout(): void {

	}

}


class ApplicationMediator extends ys.Mediator {
	constructor(view: egret.DisplayObject) {
		super(view);
	}
	protected addLogic() {
		let v = <Application>this.getView();

		egret.lifecycle.addLifecycleListener((context) => {
			// custom lifecycle plugin
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

			//注册数据代理
			cfg.proxy && cfg.proxy.forEach(className => {
				this.registerProxy(className);
			})
			//注册指令
			cfg.command && cfg.command.forEach(cmd => {
				this.registerCommand(cmd);
			})

			if (!GG.setup(v, cfg)) return;

			RES.registerVersionController(new ys.VersionController(cfg.versionFun));
			const reporter = v.loading;
			reporter.onReady();
			GG.Loader.setRespath(cfg.resourceRoot);
			GG.Loader.setup(async () => {
				var i = 0;
				var len = v.cfg.groups.length;
				if (len) {
					while (i < len) {
						await GG.Loader.loadGroup(cfg.groups[i], reporter)
						i++;
					}
				} else {
					reporter.onLoaded('');
				}

			}, this, cfg.resourceJSON);
			//内置通知
			stage.addEventListener(egret.Event.RESIZE, () => {
				this.sendNotice('resize');
			}, this);

		}, this);



	}

	protected listenNotice() {
		return [];
	}

	protected onNotice(no: ys.Notice) {
		let name = no.name;
		console.log(name);
		let v = <Application>this.getView();
	}
}