module ui {
	export class Task extends ui.DomPopUp{
		public constructor() {
			super();

			let close = this.addClose('resource/close.png',750*0.5,ys.Context.stageH - 100,76,76);

			let bg = new ys.DomDiv();
			// bg.set(0,0,750,740);
			// bg.el.style.borderRadius = bg.getDomPx(20);// `${ys.DOM.bili*20}px`;
			bg.el.style.borderTopLeftRadius = bg.el.style.borderTopRightRadius = bg.getDomPx(20);
			bg.el.style.backgroundColor = '#fff';
			bg.centerX(0);
			bg.el.style.width = this.getDomPx(750);
			bg.el.style.height = this.getDomPx(750);
			bg.el.style.bottom = this.getDomPx(0);
			// bg.centerY(0);

			this.addChild(bg.el);

			document.body.appendChild(this.el);
		}
	}
}