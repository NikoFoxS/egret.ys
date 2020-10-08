module ys {
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
			return 1/egret.sys.DisplayList.$canvasScaleFactor;
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

		getDomSize(size: number) {
			return (size * this.scale) + 'px';
		}

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
			txt.style.fontSize = this.getDomSize(size);
			txt.style.top = this.getDomSize(0);
			txt.style.left = this.getDomSize(0);
			txt.style.width = this.getDomSize(this.width);
			txt.style.height = this.getDomSize(this.height);
			txt.style.lineHeight = this.getDomSize(size * 1.5);
			txt.style.wordWrap = 'break-word';
			txt.style.margin = '0px';
		}
		private txt: HTMLParagraphElement;
	}


	export class DomDivButton extends DomBase {
		constructor(color, borderRadius, position?: string) {
			super('div', position);
			this.setStyle({ "background-color": `${color}`, "border-radius": this.getDomSize(borderRadius), "transform": `translate(-50%,-50%)` });

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
			txt.style.fontSize = this.getDomSize(size);
			txt.style.top = this.getDomSize(this.height / 2);
			txt.style.left = this.getDomSize(this.width / 2);
			txt.style.lineHeight = this.getDomSize(this.height);
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
			// this.setStyle({ "background-color": `${color}`, "border-radius": this.getDomSize(borderRadius), "transform": `translate(-50%,-50%)` });
			this.setStyle({ "background": `url(${src}) no-repeat`, "background-size": '100%', "transform": `translate(-50%,-50%)` })
		}

		public setText(t: string, color, size = 24) {
			let txt = this.txt;
			txt.innerHTML = t;
			txt.style.color = color;
			txt.style.fontSize = this.getDomSize(size);
			txt.style.top = this.getDomSize(this.height / 2);
			txt.style.left = this.getDomSize(this.width / 2);
			txt.style.lineHeight = this.getDomSize(this.height);
			txt.style.transform = "translate(-50%,-50%)";
			txt.style.margin = 'auto';
		}
		private txt: HTMLParagraphElement;

	}

}