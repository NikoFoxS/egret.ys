class LoadingUI extends ys.View {
	public constructor() {
		super();
		const ui = {
			prop: {},
			child: [
				{
					type: "ys.Bitmap",
					prop: {src:"loading-bg_jpg", width: ys.Context.stageW, height: ys.Context.stageH}
				},
				{
					type: "ys.Text",
					prop: { var: "txt", width: ys.Context.stageW, height: 100, textAlign: "center", textColor: 0, size: 100, centerY: 0 }
				}
			]
		}

		this.json = ui;

		let t = this.getVar<ys.Text>('txt');
		t.visible = false;
	}

	progress(current: number, total: number): void {
		let t = this.getVar<ys.Text>('txt');
		t.text = current + "/" + total;
	}

}