module app {
	export class WarShip extends ys.UI {
		constructor(name, res) {
			super();

			let bm = ys.newBitmap(res, this);

			let txt = ys.newLabel(this);
			txt.text = name;

			this.scaleX = this.scaleY = 0.5;

			// this.addMediator(WarShipMediator);
		}

		public id: string;
		public info: any;
		private _speed:number = 3;
		public get speed()
		{
			return this._speed;
		}

		public move() {

		}

		public shoot() {

		}
	}

	class WarShipMediator extends ys.mvc.Mediator {
		constructor() {
			super();
		}
	}
}