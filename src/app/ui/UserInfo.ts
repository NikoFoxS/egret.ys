module ui {
	export class UserInfo extends ys.UIComponent {
		public constructor() {
			super();
			this.json = {
				child: [
					{
						type: "ys.Bitmap",
						prop: {
							"src": "home_xx_png"
						}
					},
					{
						type: "ys.Text",
						prop: {
							"var": "txt", "left": 109, "top": 2, "width": 86, "height": 46, "size": 21, "textAlign": "left", "verticalAlign": "middle", "textColor": 16777215
						}
					},
					{
						type: "ys.Bitmap",
						prop: { "var": "avatar", "width": 42, "height": 42 }
					},
					{
						type: "ys.Circle",
						prop: { "var": "mask", "left": 51, "top": 25, "radius": 21, "color": "0x000" }
					}
				]
			};

			let txt = this.getVar('txt') as ys.Text;
			this.txtCrystal = txt;

			let mask = this.getVar('mask') as ys.Circle;
			let a = this.getVar('avatar') as ys.Bitmap;

			a.src = 'resource/a.png';
			a.anchorOffsetX = a.width * 0.5;
			a.anchorOffsetY = a.width * 0.5;
			a.x = mask.x;
			a.y = mask.y;
			a.mask = mask;

			this.update();

		}

		private txtCrystal: ys.Text;
		update() {
			this.txtCrystal.text = '' + ys.math_randomInt(1000, 9999);
		}
	}
}
