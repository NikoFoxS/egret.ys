namespace ys {

	export class Context {

		/**是否小尺寸手机 */
		static get small_size_phone() {
			return Context.stageW / Context.stageH > 750 / 1400;
		}
		/**舞台的实例 */
		static get stage() {
			return egret.MainContext.instance.stage;
		}
		/**main容器 */
		static get main() {
			return egret.MainContext.instance.stage.getChildAt(0) as egret.DisplayObjectContainer;
		}
		/**舞台宽 */
		static get stageW() {
			return Context.stage.stageWidth;
		}
		/**舞台高 */
		static get stageH() {
			return Context.stage.stageHeight;
		}
		/**舞台半宽 */
		static get stageHalfW() {
			return Context.stage.stageWidth * 0.5;
		}
		/**舞台半高 */
		static get stageHalfH() {
			return Context.stage.stageHeight * 0.5;
		}
		/**egret的画布 */
		static get canvas() {
			var player = <HTMLDivElement>document.querySelector(".egret-player");
			return player && player.getElementsByTagName('canvas')[0] || null;
		}

		/**canvas坐标缩放到DOM坐标 */
		static get ScaleFactorCanvasToDom() {
			return 1 / egret.sys.DisplayList.$canvasScaleFactor;
		}
		/** */
		static get ScaledFactorDomToCanvas() {
			return egret.sys.DisplayList.$canvasScaleFactor;
		}

		static get isLocalhost() {
			let b = false;
			if (window) {
				let link = window.location.href;
				if (link.indexOf('192.168') != -1 || link.indexOf('127.0.0.1') != -1 || link.indexOf('localhost') != -1) {
					b = true;
				}
			}
			return b;
		}

	}


	export function setup(cfg: ys.Config) {
		const stage = ys.Context.stage;
		//跨域设置
		egret.ImageLoader.crossOrigin = 'anonymous';
		//如果是PC
		if (!egret.Capabilities.isMobile) {
			stage.orientation = "auto";
		}
		stage.orientation = cfg.orientation;
		stage.scaleMode = cfg.scaleMode;
		stage.setContentSize(cfg.width, cfg.height);

		//防止PC端，滚动鼠标时，引起H5跟随滑动。
		if (!egret.Capabilities.isMobile) {
			document.documentElement.style.overflow = 'hidden';
		}

		//并发加载数为4
		RES.setMaxLoadingThread(4);
		//加载重试次数为1
		RES.setMaxRetryTimes(1);
		//设置帧频
		stage.frameRate = cfg.fps;

		if (!cfg.log) {
			console.log = () => { };
		}

		//如果是安卓的话，特殊处理输入框不能自动弹出问题
		if (egret.Capabilities.os == "Android") {
			var clientWidth = document.documentElement.clientWidth;
			var clientHeight = document.documentElement.clientHeight;
			document.body.style.width = clientWidth + "px";
			document.body.style.height = clientHeight + "px";
		}

		if (egret.Capabilities.os == 'Android') {
			//解决Android输入文本 不上弹的bug.
			window.addEventListener('resize', function () {
				if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
					if (egret.Capabilities.os == "Android") {
						var clientWidth = document.documentElement.clientWidth;
						var clientHeight = document.documentElement.clientHeight;
						document.body.style.width = clientWidth + "px";
						document.body.style.height = clientHeight + "px";
					}

					window.setTimeout(function () {
						document.activeElement['scrollIntoViewIfNeeded'](true);
					}, 0);
				}
			})

			document.body.addEventListener("blur", function () {
				window.scrollTo(0, 0);
			}, true);

		} else if (egret.Capabilities.os == 'iOS') {
			//解决ios输入文本 不上弹的bug.
			document.body.addEventListener("focus", function () {
				let _input = document.activeElement as HTMLInputElement;
				document.body.scrollTop = innerHeight / 4;
			}, true);

			document.body.addEventListener("blur", function () {
				document.body.scrollTop = 0;
				window.scrollTo(0, 0);
			}, true);
		}
	}

	export function removeDisplayObject(d: egret.DisplayObject): void {
		d && d.parent && d.parent.removeChild(d);
	}

}