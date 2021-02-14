class LoadingUI extends ys.Prefab {
	public constructor() {
		super();
		const ui = {
			type: "ys.Container",
			prop: {},
			child: [
				{
					type: "ys.Shape",
					prop: { width: ys.Context.stageW, height: ys.Context.stageH, color: 0xcccccc }
				},
				{
					type: "ys.Text",
					prop: { var: "txt", width: ys.Context.stageW, height: 100, textAlign: "center", textColor: 0, size: 100, centerY: 0 }
				}
			]
		}

		this.json = ui;
	}

	progress(current: number, total: number): void {
		let t = this.getVar<ys.Text>('txt');
		t.text = current + "/" + total;
	}

}