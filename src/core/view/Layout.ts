namespace ys {
	export class Layout {
		public constructor() {
		}

		static left(d: any, val: number) {
			const offsetX = d.anchorOffsetX * d.scaleX;
			d.x = val + offsetX;
		}

		static right(d: any, val: number, refWidth: number) {
			const offsetX = d.anchorOffsetX * d.scaleX;
			d.x = refWidth - val - d.width * d.scaleX + offsetX;
		}

		static centerX(d: any, val: number, refWidth: number) {
			const offsetX = d.anchorOffsetX * d.scaleX;
			d.x = (refWidth - d.width * d.scaleX) * 0.5 + val + offsetX;
		}

		static top(d: any, val: number) {
			const offsetY = d.anchorOffsetY * d.scaleY;
			d.y = val + offsetY;
		}

		static bottom(d: any, val: number, refHeight: number) {
			const offsetY = d.anchorOffsetY * d.scaleY;
			d.y = refHeight - val - d.height * d.scaleX + offsetY;
		}

		static centerY(d: any, val: number, refHeight: number) {
			const offsetY = d.anchorOffsetY * d.scaleY;
			d.y = (refHeight - d.height * d.scaleY) * 0.5 + val + offsetY;
		}

	}
}