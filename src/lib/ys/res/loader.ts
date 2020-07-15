module ys {
	export class Loader extends egret.EventDispatcher {
		public constructor() {
			super();
		}

		private respath: string = "";
		public setRespath(path: string): void {
			this.respath = path;
		}

		/**
		 * @url default.res.json的路径 每次加载最新的，如果资源有修改，在default.res.json给资源加上版本号即可。
		 */
		public async  setup(callback: Function, ref: any, url: string = 'default.res.json') {
			console.log('loader setup', url,cfg.groups)
			if (cfg.groups.length) {
				await RES.loadConfig(url, this.respath);//微信小游戏，不能带随机数。
			}
			callback.call(ref);
		}

		/**
		 * 加载界面
		 */
		public async loadGroup(name: string, preporter: LoadingReporter) {
			try {
				if (RES.isGroupLoaded(name)) {
					preporter.onLoaded(name);
				} else {
					preporter.onStart(name);
					await RES.loadGroup(name, 9999, preporter);
					preporter.onLoaded(name);
				}

			} catch (e) {
				console.warn(e);
			}
		}

		/**
		 * 分步加载
		 */
		public async loadGroupByStep(name, onLoaded: Function, ref) {
			try {
				var b = RES.isGroupLoaded(name);
				if (b) {
					onLoaded.call(ref);
				} else {
					await RES.loadGroup(name);
					onLoaded.call(ref);
				}
			} catch (e) {
				onLoaded.call(ref);
			}
		}

	}
}

