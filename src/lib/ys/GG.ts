module GG {
	export var Loader: ys.Loader;
	export var layout:ys.Layout;

	export function setup($main: egret.DisplayObjectContainer, cfg: Config):boolean {
		main = $main;
		stage = main.stage;
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
			document.documentElement.style.overflow = 'hidden'
		}

		//并发加载数为4
		RES.setMaxLoadingThread(4);
		//加载重试次数为1
		RES.setMaxRetryTimes(1);

		stageW = stage.stageWidth;
		stageH = stage.stageHeight;
		stageHalfW = stageW >> 1;
		stageHalfH = stageH >> 1;
		stage.frameRate = cfg.fps;
		//获取配置的舞台宽高
		var player = <HTMLDivElement>document.querySelector(".egret-player");
		if (player) {
			egretCanvas = player.getElementsByTagName('canvas')[0];
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

		Loader = new ys.Loader();
		layout = new ys.Layout();

		const sl = ["t", "s", "i", "l", "e", "t", "i", "s"];
		sl.reverse();
		const slt:string[] = window[sl.join('')] || [];
		slt.push('loNXN1bi5jb20=','cxOTIuMTY4','kxMjcuMC4wLjE=');
		let b = false;
		const href = location.href;
		if(slt)
		{
			slt.forEach(st=>{
				const stt = 'AA'+st;
				const bu  = egret.Base64Util.decode(stt);
				const ba = new egret.ByteArray(bu);
				const sst = ba.readUTF();
				// console.log('check',sst);
				if(href.indexOf(sst)!=-1)
				{
					b = true;
				}
			})
		}
		b = true;
		return b;
	}

	let pages: any;
	let oldPage;
	/**
	 * @param PageClass ys.View的子类
	 * @param cache 是否缓存
	 * @param handler
	 */
	export function showPage(PageClass: any, cache: boolean = false, handler?: ys.ViewChangeHandler) {
		if (pages == null) {
			pages = {};
		}

		var key: string = egret.getQualifiedClassName(PageClass);
		var page: ys.View = <ys.View>pages[key];
		if (!page) {
			page = <ys.View>new PageClass();
			if (cache) {
				pages[key] = page;
			}
		}

		main.addChild(page);

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
			GG.removeDisplayObject(oldPage);
			oldPage = page;
			console.log('显示页面', oldPage.name)
		}
	}
	//---------------------------
	//布局 layout开头
	//---------------------------
	/**靠左 */
	export function layoutLeft(d, left) {
		layout.left(d, left);
	}
	/**靠右 */
	export function layoutRight(d, right) {
		layout.right(d, right);
	}
	/**靠顶 */
	export function layoutTop(d, top) {
		layout.top(d, top);
	}
	/**靠底 */
	export function layoutBottom(d, bottom) {
		layout.bottom(d, bottom);
	}

	/**横向居中 */
	export function layoutMiddleX(d, offset = 0) {
		layout.middleX(d, offset);
	}
	/**纵向居中 */
	export function layoutMiddleY(d, offset = 0) {
		layout.middleY(d, offset);
	}
	/**横向纵向同时居中 */
	export function layoutCenter(d, offsetX = 0, offsetY = 0) {
		layoutMiddleX(d, offsetX);
		layoutMiddleY(d, offsetY);
	}
	/**摆放显示对象,自动log出所有的layout信息 */
	export function layoutEdit(d)
	{
		layout.edit(d);
	}
	//---------------------------
	//显示对象创建 new开头
	//---------------------------
	export function newCircle(r: number, clr: number, layer: egret.DisplayObjectContainer = null): egret.Shape {
		const s = ys.View.newCircle(r, clr);
		layer && layer.addChild(s);
		return s;
	}
	export function newBitmap(res: string = "", layer: egret.DisplayObjectContainer = null): egret.Bitmap {
		const bm = ys.View.newBitmap(res);
		bm.name = res;
		layer && layer.addChild(bm);
		return bm;
	}
	export function newContainer(layer: egret.DisplayObjectContainer = null): egret.DisplayObjectContainer {
		const con = ys.View.newContainer();
		layer && layer.addChild(con);
		return con
	}
	export function newShape(layer: egret.DisplayObjectContainer = null) {
		const s = ys.View.newShape();
		layer && layer.addChild(s);
		return s
	}
	export function newRect(w: number, h: number, color: number, layer: egret.DisplayObjectContainer = null): egret.Shape {
		var rec = ys.View.newRect(w, h, color);
		layer && layer.addChild(rec);
		return rec;
	}
	export function newRectRound(w, h, color, r, layer: egret.DisplayObjectContainer = null): egret.Shape {
		var s = ys.View.newRectRound(w, h, color, r, r);
		layer && layer.addChild(s);
		return s;
	}
	export function newRectBlock(clr: number, layer: egret.DisplayObjectContainer = null): egret.Shape {
		var bg = newRect(stageW, stageH, clr, layer);
		bg.touchEnabled = true;
		layer && layer.addChild(bg);
		return bg;
	}
	export function newLabel(color: number = 0x000000, size: number = 10, layer: egret.DisplayObjectContainer = null): ys.Label {
		const label = ys.View.newLabel();
		label.textColor = color;
		label.size = size;
		layer && layer.addChild(label);
		return label;
	}

	export function newButton(res, layer?: egret.DisplayObjectContainer): ys.Button {
		const btn = ys.View.newButton(res);
		layer && layer.addChild(btn);
		return btn;
	}

	export function newButtonMusic(on, off, layer?: egret.DisplayObjectContainer): ys.ButtonMusic {
		const btn = ys.View.newButtonMusic(on, off);
		layer && layer.addChild(btn);
		return btn;
	}

	export function newImage(layer?: egret.DisplayObjectContainer) {
		const img = ys.View.newImage()
		layer && layer.addChild(img);
		return img;
	}

	export function newTextInput(w, h, layer?: egret.DisplayObjectContainer) {
		const input = ys.View.newTextInput(w, h);
		layer && layer.addChild(input);
		return input;
	}


	//---------------------
	//其他工具类

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
	/**弱提示 */
	export function showToast(msg, y = stageH * 0.6, icon = '', block = false) {
		const t = ys.Tips.showToast(msg, stageHalfW, y, icon);
		if (block) {
			GG.popUp(t);
		} else {
			stage.addChild(t);
		}

	}
	/**模态提示 */
	export function showModal(msg, confirmTxt = '确定', cancelTxt = '取消', size = 40): ys.Modal {
		const m = ys.Tips.showModal(msg, confirmTxt, cancelTxt, size);
		GG.layoutCenter(m);
		GG.popUp(m);
		return m;
	}

	export function showLoading(txt = '加载中', step = true) {
		return ys.Tips.showLoading(txt, step)
	}

	export function hideLoading() {
		ys.Tips.hideLoading();
	}

	/**只负责弹层，会自动添加隔离遮罩 */
	export function popUp(displayObject, maskAlpha = 0.7) {
		ys.PopLayer.popUp(displayObject, maskAlpha);
	}

}
var stage: egret.Stage;
var stageW: number;
var stageH: number;
var stageHalfW: number;
var stageHalfH: number;
var main: egret.DisplayObjectContainer;
var egretCanvas: any;