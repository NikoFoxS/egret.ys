module ui {
	export class Button extends ys.Container {
		public constructor() {
			super();
		}

		round: number = 100;
		border: number = 0;
		color: number;
		label: string = '';
		labelColor: number;
		labelSize: number;

		$create(): void {
			let rec = new ys.Shape();
			let g = rec.graphics;
			g.beginFill(this.color);
			g.drawRoundRect(0, 0, this.width, this.height, this.round, this.round);
			g.endFill();
			this.addChild(rec);
			let label = new ys.Text();
			label.fontFamily = 'myFont'
			label.width = this.width;
			label.height = this.height;
			label.text = this.label;
			label.textColor = this.labelColor;
			label.size = this.labelSize;
			label.verticalAlign = 'middle';
			label.textAlign = 'center';
			label.multiline = false;
			this.addChild(label);
		}
	}
}