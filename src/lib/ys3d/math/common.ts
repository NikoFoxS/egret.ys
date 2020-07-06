
module ys3d {
	export const EPSILON = 0.000001;

	export class math {
		public constructor() {
		}

		public static hypot(...arg) {
			var y = 0, i = arguments.length;
			while (i--) y += arguments[i] * arguments[i];
			return Math.sqrt(y);
		}
	}
}