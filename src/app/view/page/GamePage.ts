module app {
	export class GamePage extends ys.Page {
		public constructor() {
			super();
		}

		OnStart() {
			let ws = new WarShips();
			this.addChild(ws);

			//ui
		}
	}
}