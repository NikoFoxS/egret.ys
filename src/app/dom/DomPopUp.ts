module ui {
	export class DomPopUp extends ys.DomDiv {
		public constructor() {
			super();
			this.el.setAttribute('class', 'darkbg');
			window.scrollTo(0,0);
		}

		addChild(node:Node):void
		{
			this.el.appendChild(node);
		}

		addClose(res, x = 0, y = 0, w = 70, h = 70) {
			let close = new ys.DomImageButton(res);
			// close.setText('关闭', 0xffffff);
			this.el.appendChild(close.el);
			close.set(x, y, w, h);
			close.el.addEventListener("click",()=>{
				this.remove();
			})
			// document.addEventListener
			return close;
		}
	}
}