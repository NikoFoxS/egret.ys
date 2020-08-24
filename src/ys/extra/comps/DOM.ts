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
			update && this.pudateStyle();
		}
		private _style: any;
		pudateStyle() {
			let style = '';
			for (let s in this._style) {
				style += `${s}:${this._style[s]};`;
			}
			this.el.style.cssText = style;
		}

		disableTouchMove() {
			//阻止滑动
			this.el.ontouchmove = function (e) {
				e.preventDefault && e.preventDefault();
				e.returnValue = false;
				e.stopPropagation && e.stopPropagation();
			}
		}

		get scale()
		{
			return ys.Context.SCALE;
		}

		public remove(): void {
			if(this.el && this.el.parentNode)
			{
				this.el.parentNode.removeChild(this.el);
			}
        }
	}

	export class DomImage extends DomBase {
		constructor(position?:string) {
			super('img', position);
		}

		public set src(url) {
			const el = this.el as HTMLImageElement;
			el.src = url;
		}

	}


	export class DomDiv extends DomBase {
		constructor(position?:string) {
			super('div', position);
		}
	}


	export class DomButton extends DomBase {
		constructor(position?:string) {
			super('div', position);
		}
	}

}