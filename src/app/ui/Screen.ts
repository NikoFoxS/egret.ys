module ui {
	export class Screen extends ys.UIComponent {
		public constructor() {
			super();
			this.json = {
				child: [
					{
						type: "ys.Bitmap",
						prop: { src: "home_pm_png" }
					},
					{
						type: "ys.Text",
						prop: { var: "txt_name", width: 100, top: 10 }
					},
					{
						type: "ys.Text",
						prop: { var: "txt_income", width: 100, top: 228 }
					},
					{
						type: "ys.Text",
						prop: { var: "txt_cd", width: 100, top: 283 }
					}
				]
			};

			//
			let txtName = this.getVar('txt_name') as ys.Text;
			let txtIncome = this.getVar('txt_income') as ys.Text;
			let txtCD = this.getVar('txt_cd') as ys.Text;

		}

		private txtName;
		private txtIncome;
		private txtCD;


	}
}