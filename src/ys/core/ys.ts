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
		console.log('stage', stage, cfg.width, cfg.height);
		stage.setContentSize(cfg.width, cfg.height);
		cfg.services.forEach(sClass => {
			new sClass();
		})

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

	export class PageChangeHandler {
		public onChange(newView: egret.DisplayObject, oldView: egret.DisplayObject, next: Function): void {
			//1 页面切换逻辑
			//2 调用next();结束切换
		}
	}

	let pages: any;
	let oldPage;

	export function showPage(PageClass: any, param?: any, callback?: Function) {
		if (pages == null) {
			pages = {};
		}

		const page = <ys.Page>new PageClass();
		page.data = param;
		ys.Context.main.addChild(page);
		page.start();

		function next(): void {
			if (oldPage) {
				console.log('删除页面', egret.getQualifiedClassName(oldPage))
			}
			ys.removeDisplayObject(oldPage);
			oldPage = page;
			console.log('显示页面', egret.getQualifiedClassName(page))
		}

		if (callback) {
			callback(oldPage, page, next);
		} else {
			next();
		}

	}

	//---------------------------
	//random
	//---------------------------
	/** ≥min ＜max */
	export function randomNumber(min: number, max: number): number {
		if (max < min) {
			var t = max;
			max = min;
			min = t;
		}
		return min + Math.random() * (max - min);
	}
	/** ≥min ＜max */
	export function randomInt(min: number, max: number): number {
		var num = randomNumber(min, max);
		return parseInt(num + "");
	}
	/**数组随机 */
	export function randomArr(arr: any[]): any {
		return arr[Math.random() * arr.length | 0];
	}


	//---------------------------
	//popup
	//---------------------------
	let popblock: egret.Shape;
	let popLayer: egret.DisplayObjectContainer;
	/**只负责弹层，会自动添加隔离遮罩 */
	export function popUp(d: egret.DisplayObject, blockAlpha = 0.7, blockTween: boolean = true, blockTweeTime = 300) {
		if (!popLayer) {
			popLayer = new egret.DisplayObjectContainer();
		}

		if (!popblock) {
			const s = new egret.Shape();
			s.graphics.beginFill(0x000000);
			s.graphics.drawRect(0, 0, ys.Context.stageW, ys.Context.stageH);
			s.graphics.endFill();
			s.cacheAsBitmap = true;
			popblock = s;
			popblock.alpha = blockAlpha;
			popblock.cacheAsBitmap = true;
			popblock.touchEnabled = true;
		}
		const block = popblock;
		block.scaleX = ys.Context.stageW / block.width;
		block.scaleY = ys.Context.stageH / block.height;
		const layer = popLayer;
		ys.Context.stage.addChild(layer);

		layer.addChild(block);
		layer.addChild(d);

		block.alpha = blockAlpha;
		blockAlpha == 0 && (blockTween = false);

		if (layer.numChildren == 2 && blockTween) {
			egret.Tween.removeTweens(block);
			block.alpha = 0;
			egret.Tween.get(block).to({ alpha: blockAlpha }, blockTweeTime);
		}

		d.once(egret.Event.REMOVED_FROM_STAGE, () => {
			//remove后，numChildren不会马上-1
			if (layer.numChildren == 2) {
				if (blockTween) {
					egret.Tween.get(block).to({ alpha: 0 }, blockTweeTime).call(() => {
						ys.removeDisplayObject(layer);
					});
				} else {
					ys.removeDisplayObject(layer);
				}


			} else {
				layer.addChildAt(block, layer.numChildren - 3);
			}
		}, this);
	}

	//---------------------
	//others
	//---------------------
	export function setAnchor(d: egret.DisplayObject, ax: number = 0.5, ay: number = 0.5, fix: boolean = false): void {
		if (d) {
			if (d.width && d.height) {
				var anx = d.anchorOffsetX;
				var any = d.anchorOffsetY;
				d.anchorOffsetX = d.width * ax;
				d.anchorOffsetY = d.height * ay;
				//fix=true 修改锚点但是位置不变
				if (d.parent && fix) {
					d.x += d.anchorOffsetX - anx;
					d.y += d.anchorOffsetY - any;
				}
			} else {
				//显示对象宽高都为0
			}
		}

	}

	export function removeDisplayObject(d: egret.DisplayObject): void {
		d && d.parent && d.parent.removeChild(d);
	}


}


