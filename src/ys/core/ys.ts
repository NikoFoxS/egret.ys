namespace ys {

	export let stage: egret.Stage = ys.Context.STAGE;
	export let stageW: number = stage.stageWidth;
	export let stageHalfW: number = stage.stageWidth >> 1;
	export let stageH: number = stage.stageHeight;
	export let stageHalfH: number = stage.stageHeight >> 1;
	export function getDomScale(scaleMode:string)
	{
		return stage.scaleMode == egret.StageScaleMode.FIXED_WIDTH ?
				window.innerWidth / stageW : window.innerHeight / stageH;
	}
	
	export class Context {

		static get STAGE() {
			return egret.MainContext.instance.stage;
		}

		static get MAIN() {
			return egret.MainContext.instance.stage.getChildAt(0) as egret.DisplayObjectContainer;
		}

		static get STAGE_W() {
			return Context.STAGE.stageWidth;
		}

		static get STAGE_H() {
			return Context.STAGE.stageHeight;
		}

		static get STAGE_W_HALF() {
			return Context.STAGE.stageWidth * 0.5;
		}

		static get STAGE_H_HALF() {
			return Context.STAGE.stageHeight * 0.5;
		}

		static get CANVAS() {
			var player = <HTMLDivElement>document.querySelector(".egret-player");
			return player && player.getElementsByTagName('canvas')[0] || null;
		}

		/**设计坐标缩放到DOM坐标的大小，只支持固定宽和固定高 */
		static get SCALE() {
			return Context.STAGE.scaleMode == egret.StageScaleMode.FIXED_WIDTH ?
				window.innerWidth / Context.STAGE_W : window.innerHeight / Context.STAGE_H;
		}


	}

	let showlogger: boolean;
	export function logger_log(msg: any, ...arg: any[]) {
		if (showlogger) {
			if (arg.length) {
				console.log(msg, arg);
			} else {
				console.log(msg);
			}
		}
	}

	export function setup(cfg: ys.Config) {
		const stage = ys.Context.STAGE;
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

		showlogger = cfg.log;

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
	export function showPageView(PageClass: any, handler?: ys.PageChangeHandler) {
		if (pages == null) {
			pages = {};
		}

		var key: string = egret.getQualifiedClassName(PageClass);
		var page: ys.View = <ys.View>pages[key];
		if (!page) {
			page = <ys.View>new PageClass();
			if (page.cache) {
				pages[key] = page;
			}
		}
		ys.Context.MAIN.addChild(page);
		if (handler) {
			if (oldPage) {
				handler.onChange(page, oldPage, next);
			} else {
				next();
			}
		} else {
			next();
		}

		function next(): void {
			if (oldPage) {
				console.log('删除页面', oldPage.name)
			}
			ys.removeDisplayObject(oldPage);
			oldPage = page;
			console.log('显示页面', oldPage.name)
		}
	}

	//---------------------------
	//显示对象创建 new开头
	//---------------------------
	export function newBitmap(res: string='', layer?: egret.DisplayObjectContainer): ys.Bitmap {
		const bm = new ys.Bitmap(res);
		layer && layer.addChild(bm);
		return bm;
	}

	export function newContainer(layer?: egret.DisplayObjectContainer): ys.Container {
		const con = new ys.Container();
		layer && layer.addChild(con);
		return con;
	}

	export function newRect(w, h, color,radius=0, layer?: egret.DisplayObjectContainer): ys.Shape {
		const rec = new ys.Shape();
		rec.drawRec(w,h,color,radius);
		layer && layer.addChild(rec);
		return rec;
	}

	export function newCircle(r, color, layer?: egret.DisplayObjectContainer): ys.Shape {
		const s = new ys.Shape();
		s.drawCirle(r,color);
		layer && layer.addChild(s);
		return s;
	}

	// export function newRectRound(w, h, color, cornerW, cornerH, layer?: egret.DisplayObjectContainer): ys.Shape {
	// 	const rec = new ys.Shape();
	// 	const g = rec.graphics;
	// 	g.beginFill(color);
	// 	g.drawRoundRect(0, 0, w, h, cornerW, cornerH);
	// 	g.endFill();
	// 	layer && layer.addChild(rec);
	// 	return rec;
	// }

	export function newTextField(color, size, layer?: egret.DisplayObjectContainer): ys.TextField {
		const t = new ys.TextField();
		t.textColor = color;
		t.size = size;
		layer && layer.addChild(t);
		return t;
	}

	//---------------------------
	//布局 layout开头
	//---------------------------
	export function layoutLeft(d: egret.DisplayObject, left) {
		d.x = left + d.anchorOffsetX;
	}

	export function layoutRight(d: egret.DisplayObject, right) {
		d.x = ys.Context.STAGE_W - d.width + d.anchorOffsetX - right;
	}

	export function layoutMiddleX(d: egret.DisplayObject, offset = 0) {
		d.x = ys.Context.STAGE_W_HALF - d.width * 0.5 + d.anchorOffsetX + offset;
	}

	export function layoutMiddleY(d: egret.DisplayObject, offset = 0) {
		d.y = ys.Context.STAGE_H_HALF - d.height * 0.5 + d.anchorOffsetY + offset;
	}

	export function layoutTop(d: egret.DisplayObject, top) {
		d.y = top + d.anchorOffsetY;
	}

	export function layoutBottom(d: egret.DisplayObject, bottom) {
		d.y = ys.Context.STAGE_H - d.height + d.anchorOffsetY - bottom;
	}

	export function layoutVH(d: egret.DisplayObject, vh) {
		d.y = ys.Context.STAGE_H * vh;
	}
	/**横向纵向同时居中 */
	export function layoutCenter(d, offsetX = 0, offsetY = 0) {
		layoutMiddleX(d, offsetX);
		layoutMiddleY(d, offsetY);
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
			s.graphics.drawRect(0, 0, ys.Context.STAGE_W, ys.Context.STAGE_H);
			s.graphics.endFill();
			s.cacheAsBitmap = true;
			popblock = s;
			popblock.alpha = blockAlpha;
			popblock.cacheAsBitmap = true;
			popblock.touchEnabled = true;
		}
		const block = popblock;
		block.scaleX = ys.Context.STAGE_W / block.width;
		block.scaleY = ys.Context.STAGE_H / block.height;
		const layer = popLayer;
		ys.Context.STAGE.addChild(layer);

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


