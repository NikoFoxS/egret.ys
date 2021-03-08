module ui {
	export class BigBear extends ys.UIComponent {
		public constructor() {
			super();
			this.json = {
				child: [
					{
						type: "ys.Bitmap",
						prop: { src: "home_xiong_png" }
					},
					{
						type: "ys.Bitmap",
						prop: { var: "talk", src: "talk_deal_png", alpha: 0, top: -30 }
					}
				]
			};


		}

		deal() {
			let talk = this.getVar("talk") as ys.Bitmap;
			if (talk) {
				talk.alpha = 0;
				egret.Tween.removeTweens(talk);
				egret.Tween.get(talk).to({ alpha: 1 }, 500)
					.wait(3000)
					.to({ alpha: 0 }, 500)
			}

		}
	}
}