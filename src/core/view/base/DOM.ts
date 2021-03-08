module ys {

	export class DOM {
		public static top(): void {
			document.documentElement.scrollTop = 0;
			window.scrollTo(0, 0);
		}

		public static bili = window.innerWidth / 750;

		public static createDomDiv() {
			let tdiv = document.createElement("div");
			tdiv.setAttribute('class', 'abs');
			return tdiv;
		}
		public static createDomImage(url, w, h, x, y) {
			let timg = document.createElement("img");
			timg.setAttribute('class', 'abs');
			timg.src = this.getFullurl(url);
			timg.style.width = DOM.getFormat(w);
			timg.style.height = DOM.getFormat(h);
			timg.style.top = DOM.getFormat(y);
			timg.style.left = DOM.getFormat(x);
			return timg;
		}
		public static createDomButton(url, w, h, x, y) {
			let tbtn = document.createElement("img");
			tbtn.setAttribute('class', 'btn abs');
			tbtn.src = this.getFullurl(url);
			tbtn.style.width = DOM.getFormat(w);
			tbtn.style.height = DOM.getFormat(h);
			tbtn.style.top = DOM.getFormat(y);
			tbtn.style.left = DOM.getFormat(x);

			return tbtn;
		}
        /**
         * 创建div按钮
         * */
		public static createDivButton(col, txt, w, h, x, y, bol = true, txtcol = "#ffffff") {
			let tbtn = document.createElement("div");
			if (bol) {
				tbtn.setAttribute('class', 'btn abs dombtn');
			} else {
				tbtn.setAttribute('class', 'abs dombtn');
				tbtn.style.transform = "translate(-50%,-50%)";
			}
			tbtn.style.backgroundColor = col;
			tbtn.style.width = DOM.getFormat(w);
			tbtn.style.height = DOM.getFormat(h);
			tbtn.style.top = DOM.getFormat(y);
			tbtn.style.left = DOM.getFormat(x);

			let ttxt = document.createElement("p");
			tbtn.appendChild(ttxt);
			ttxt.innerHTML = txt;
			ttxt.style.position = "absolute";
			ttxt.style.top = DOM.getFormat(h / 2);
			ttxt.style.left = DOM.getFormat(w / 2);
			ttxt.style.textAlign = "center";
			ttxt.style.color = txtcol;
			ttxt.style.fontSize = DOM.getFormat(24);
			ttxt.style.fontWeight = "bold";
			ttxt.style.lineHeight = DOM.getFormat(h);
			ttxt.style.verticalAlign = "middle";
			ttxt.style.transform = "translate(-50%,-50%)";
			ttxt.style.whiteSpace = "nowrap";
			tbtn["txt"] = ttxt;

			setTimeout(function () {
				if (ttxt.clientWidth > DOM.bili * (w - 16)) {
					ttxt.style.transform = "translate(-50%,-50%) scale(" + DOM.getZoom() * (w - 16) / ttxt.clientWidth + ")";
				}

			}.bind(this), 100);
			return tbtn;
		}

        /**
         * 创建div按钮 边框形
         * */
		public static createDivButtonBorder(col, txt, w, h, x, y) {
			let tbtn = document.createElement("div");
			tbtn.setAttribute('class', 'btn abs dombtnborder');
			tbtn.style.borderColor = col;
			tbtn.style.borderStyle = "solid";
			tbtn.style.borderWidth = DOM.getFormat(2);
			tbtn.style.borderRadius = DOM.getFormat(40);
			tbtn.style.width = DOM.getFormat(w - 4);
			tbtn.style.height = DOM.getFormat(h - 4);
			tbtn.style.top = DOM.getFormat(y);
			tbtn.style.left = DOM.getFormat(x);

			let ttxt = document.createElement("p");
			tbtn.appendChild(ttxt);
			ttxt.innerHTML = txt;
			ttxt.style.position = "absolute";
			ttxt.style.top = DOM.getFormat(h / 2 - 2);
			ttxt.style.left = DOM.getFormat(w / 2);
			ttxt.style.textAlign = "center";
			ttxt.style.color = col;
			ttxt.style.fontSize = DOM.getFormat(24);
			ttxt.style.lineHeight = DOM.getFormat(h);
			ttxt.style.verticalAlign = "middle";
			ttxt.style.transform = "translate(-50%,-50%)";

			setTimeout(function () {
				if (ttxt.clientWidth > DOM.bili * (w - 16)) {
					ttxt.style.transform = "translate(-50%,-50%) scale(" + DOM.getZoom() * (w - 16) / ttxt.clientWidth + ")";
				}
			}.bind(this), 100);


			return tbtn;
		}
        /**
         * 创建文本标签
         * */
		public static createDomP(txt, size, col, w, h, x, y) {
			let ttxt = document.createElement("p");
			ttxt.setAttribute('class', 'abs');
			ttxt.style.fontSize = DOM.getFormat(size);
			ttxt.style.color = col;
			ttxt.innerHTML = txt;
			if (w) {
				ttxt.style.width = DOM.getFormat(w);
			}
			ttxt.style.lineHeight = DOM.getFormat(h);
			ttxt.style.top = DOM.getFormat(y);
			ttxt.style.left = DOM.getFormat(x);
			return ttxt;
		}
        /**
         * 创建文本标签
         * */
		public static scaleTxt(txt, w) {
			if (txt.clientWidth > DOM.getZoom() * w) {
				txt.style.transform = "translate(-50%,0) scale(" + DOM.getZoom() * w / txt.clientWidth + ")";
			}
		}
		private static getFullurl(url) {
			if (url.indexOf("http") > -1) {
				return url;
			}
			if (window['cdn_host']) {
				return window['cdn_host'] + "resource/" + url;
			} else {
				return "resource/" + url;
			}
		}
        /**
         * 格式化数据
         * @param   数值
         * */
		public static getFormat(value: any) {
			return value * DOM.getZoom() + "px";
		}
        /**
         * 获取缩放比例
         * */
		public static getZoom() {
			return window.innerWidth / 750;
		}
	}

	export class DomBase {
		public constructor(tagName: string, position: string) {
			this.element = document.createElement(tagName);
			this._style = {};
			position = (position == undefined || position == null) ? 'absolute' : position;
			this.setStyle({ position: position }, true);
		}
		protected element: HTMLElement;
		public get el() {
			return this.element;
		}

		setStyle(styleJson: any, update: boolean = false) {
			(<any>Object).assign(this._style, styleJson);
			update && this.updateStyle();
		}
		private _style: any;
		updateStyle() {
			let style = '';
			for (let s in this._style) {
				style += `${s}:${this._style[s]};`;
			}
			this.el.style.cssText = style;
			console.log('updateStyle', this._style)
		}

		disableTouchMove() {
			//阻止滑动
			this.el.ontouchmove = function (e) {
				e.preventDefault && e.preventDefault();
				e.returnValue = false;
				e.stopPropagation && e.stopPropagation();
			}
		}

		get scale() {
			if(ys.Context.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT)
			{
				return window.innerHeight / ys.Context.stageH;
			}
			return window.innerWidth / ys.Context.stageW;
		}

		getDomPx(px:number):string
		{
			return (px*this.scale)+'px';
		}

		public set(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;

			x *= this.scale;
			y *= this.scale;
			w *= this.scale;
			h *= this.scale;
			this.setStyle({ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }, true);
		}

		centerX(v, refW: number = ys.Context.stageW) {
			this.x = (refW - this.width) * 0.5 + v;
			let left = this.x * this.scale;
			this.el.style.left = left + 'px';
		}

		centerY(v, refH: number = ys.Context.stageH) {
			this.y = (refH - this.height) * 0.5 + v;
			let top = this.y * this.scale;
			this.el.style.top = top + 'px';
		}

		// getDomPx(size: number) {
		// 	return (size * this.scale) + 'px';
		// }

		public x;
		public y;
		public width;
		public height;

		public remove(): void {
			if (this.el && this.el.parentNode) {
				this.el.parentNode.removeChild(this.el);
			}
		}

	}

	export class DomImage extends DomBase {
		constructor(position?: string) {
			super('img', position);
		}

		public set src(url) {
			const el = this.el as HTMLImageElement;
			el.src = RES.getVirtualUrl(url);
		}
	}


	export class DomDiv extends DomBase {
		constructor(position?: string) {
			super('div', position);
			this.el.style.position = 'absolute';
		}

	}

	export class DomTextArea extends DomBase {
		constructor(position?: string) {
			super('div', position);

			let txt = document.createElement("p");
			this.el.appendChild(txt);
			txt.style.position = "absolute";
			// txt.style.whiteSpace = "nowrap";
			this.txt = txt;

			this.setStyle({ 'overflow-x': 'hidden', 'overflow-y': 'scroll' }, true)
		}

		public setText(t: string, color, size = 24) {
			let txt = this.txt;
			txt.innerHTML = t;
			txt.style.color = color;
			txt.style.fontSize = this.getDomPx(size);
			txt.style.top = this.getDomPx(0);
			txt.style.left = this.getDomPx(0);
			txt.style.width = this.getDomPx(this.width);
			txt.style.height = this.getDomPx(this.height);
			txt.style.lineHeight = this.getDomPx(size * 1.5);
			txt.style.wordWrap = 'break-word';
			txt.style.margin = '0px';
		}
		private txt: HTMLParagraphElement;
	}


	export class DomDivButton extends DomBase {
		constructor(color, borderRadius, position?: string) {
			super('div', position);
			this.setStyle({ "background-color": `${color}`, "border-radius": this.getDomPx(borderRadius), "transform": `translate(-50%,-50%)` });

			let txt = document.createElement("p");
			this.el.appendChild(txt);
			txt.style.position = "absolute";
			txt.style.textAlign = "center";
			txt.style.fontWeight = "bold";
			txt.style.verticalAlign = "middle";
			txt.style.whiteSpace = "nowrap";
			this.txt = txt;
		}

		public setText(t: string, color, size = 24) {
			let txt = this.txt;
			txt.innerHTML = t;
			txt.style.color = color;
			txt.style.fontSize = this.getDomPx(size);
			txt.style.top = this.getDomPx(this.height / 2);
			txt.style.left = this.getDomPx(this.width / 2);
			txt.style.lineHeight = this.getDomPx(this.height);
			txt.style.transform = "translate(-50%,-50%)";
			txt.style.margin = 'auto';
		}
		private txt: HTMLParagraphElement;
	}

	export class DomImageButton extends DomBase {
		constructor(src, position?: string) {
			super('div', position);
			let txt = document.createElement("p");
			this.el.appendChild(txt);
			txt.style.position = "absolute";
			txt.style.textAlign = "center";
			txt.style.fontWeight = "bold";
			txt.style.verticalAlign = "middle";
			txt.style.whiteSpace = "nowrap";
			this.txt = txt;
			txt.style.display = 'none';
			// this.setStyle({ "background-color": `${color}`, "border-radius": this.getDomPx(borderRadius), "transform": `translate(-50%,-50%)` });
			this.setStyle({ "background": `url(${src}) no-repeat`, "background-size": '100%', "transform": `translate(-50%,-50%)` })
		}

		public setText(t: string, color, size = 24) {
			let txt = this.txt;
			txt.innerHTML = t;
			txt.style.color = color;
			txt.style.fontSize = this.getDomPx(size);
			txt.style.top = this.getDomPx(this.height / 2);
			txt.style.left = this.getDomPx(this.width / 2);
			txt.style.lineHeight = this.getDomPx(this.height);
			txt.style.transform = "translate(-50%,-50%)";
			txt.style.margin = 'auto';
			txt.style.display = 'block';
		}
		private txt: HTMLParagraphElement;

	}

}