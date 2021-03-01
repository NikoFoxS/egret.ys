module script {
	export class Home extends ys.Script {
		public constructor() {
			super();
		}

		onAdded() {
			// const v = this.view as ui.HomePage;
			// const bg = v.getDisplayObject<ys.Bitmap>('home_bg');
			// const userinfo = v.getChildByName('user_info');
			const v = this.owner as ys.Prefab;
			const userinfo = v.getVar<ys.Prefab>('user_info');
			// userinfo.alpha = 0.5;
			userinfo.touchEnabled = true;
			userinfo.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				new ui.DomRule();
				// let pop = new ys.DomDiv();
				// pop.set(0, 0, 600, 600);
				// pop.el.style.overflowX = 'hidden';
				// pop.el.style.overflowY = 'auto';
				// pop.el.style.backgroundColor = '#000'
				// pop.centerX = 0;
				// pop.centerY = 0;
				// document.body.appendChild(pop.el);

				// let block = new ys.DomDiv();
				// block.set(0, 0, 750, ys.Context.stageH * 2);
				// block.setStyle({ opacity: 1, "background-color": '#000' }, true);
				// pop.el.appendChild(block.el);

				// let img = new ys.DomImage();
				// img.set(0, 0, 600, ys.Context.stageH * 2);
				// img.src = "resource/home/index.png";
				// pop.el.appendChild(img.el);

				// let dom = new ui.PopUp();
				// dom.addClose('resource/close.png',0,0,76,76);

				// let parent = document.getElementById("egretlayer");
				// parent.appendChild(dom.el);

			}, this);
		}

		onRemove() {

		}

	}
}