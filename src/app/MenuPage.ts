class MenuPage extends ys.View {
	public constructor() {
		super();

		let json = {
			type: "ys.Container",
			prop: { width: 600, height: 600, centerX: 0, centerY: 0 },
			child: [
				{
					type: "ys.Bitmap",
					prop: { tex: 'sea_jpg', width: 600, height: 600 }
				},
				{
					type: "ys.Bitmap",
					prop: { right: 0, tex: 'headimg_jpg', width: 300, height: 300 },
					child: [
						{
							type: "script.Clicker",
							prop: {}
						}
					]
				},
				{
					type: "ys.Text",
					prop: { text: "你好世界！", width: 600, textAlign: "center", centerY: 0 }
				},
				{
					type: "ys.Container",
					prop: {}
				}
			],
			group: []
		}
		this.createViewByJson(json);
	}
}