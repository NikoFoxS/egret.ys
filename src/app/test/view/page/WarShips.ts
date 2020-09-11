module app {
	export class WarShips extends ys.View {
		public constructor() {
			super('');
		}

		public scene: egret.DisplayObjectContainer;

		OnStart() {

			// mouse.enable(ys.Context.STAGE);
			// mouse.setMouseMoveEnabled(true);

			let rec = ys.newRect(ys.Context.STAGE_W, ys.Context.STAGE_H, 0xcccccc, 0,this);

			let scene = ys.newContainer(this);
			scene.x = ys.Context.STAGE_W_HALF;
			scene.y = ys.Context.STAGE_H_HALF;

			this.scene = scene;
			this.lookAt(ys.Context.STAGE_W_HALF, ys.Context.STAGE_H_HALF);
			ys.newBitmap('sea_jpg', scene);

			this.ships = [];
			this.directioin = new egret.Point();

			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.addMediator(WarShipsMediator);
		}

		public createBattle() {

		}

		public createBoss() {

		}

		public defeatBoss() {

		}

		private ships: WarShip[];
		public createShip(id, info) {
			let s = new WarShip('niko', 'ship_png');
			s.id = id;
			s.anchorOffsetX = s.width * 0.5;
			s.anchorOffsetY = s.height;
			this.scene.addChild(s);
			this.ships.push(s);
			return s;
		}

		public getShipById(id) {
			let i = this.ships.length;
			let s;
			while (i--) {
				s = this.ships[i];
				if (s.id == id) {
					break;
				}
				s = null;
			}
			return s;
		}

		public moveShip(s: WarShip, x, y) {
			let distance = Math.sqrt((s.x - x) * (s.x - x) + (s.y - y) * (s.y - y));
			let speed = 10;
			let time = distance / speed;
			egret.Tween.removeTweens(s);
			egret.Tween.get(s).to({ x: x, y: y }, time * 100);
		}

		public fireShip(s: WarShip, x, y) {
			let ball = ys.newBitmap('ship-boom_png');
			ball.scaleX = ball.scaleY = 0.3;
			ys.setAnchor(ball);

			let dx = x - ys.Context.STAGE_W_HALF;
			let dy = y - ys.Context.STAGE_H_HALF;
			let distance = Math.sqrt(dx * dx + dy * dy);
			let time = distance;
			this.scene.addChild(ball);
			ball.x = s.x;
			ball.y = s.y;
			egret.Tween.get(ball).to({ x: x, y: y, rotation: 360 / time }, time, egret.Ease.sineOut).call(() => {
				ys.removeDisplayObject(ball);
			});
		}

		private target: WarShip;
		public followShip(s: WarShip) {
			this.target = s;
		}

		public lookAt(x, y) {
			let scene = this.scene;
			scene.anchorOffsetX = x;
			scene.anchorOffsetY = y;
		}

		public update() {
			let s = this.target;
			if (s) {

				// let dx = this.directioin.x - ys.Context.STAGE_W_HALF;
				// let dy = this.directioin.y - ys.Context.STAGE_H_HALF;
				// let distance = Math.sqrt(dx * dx + dy * dy);
				// dx /= distance;
				// dy /= distance;
				// s.x += dx * s.speed;
				// s.y += dy * s.speed;

				this.lookAt(s.x, s.y);
			}

		}

		public directioin: egret.Point;
	}

	class WarShipsMediator extends ys.mvc.Mediator {
		constructor() {
			super();
		}

		private view: WarShips;
		Install(): void {
			this.view = this.GetView<WarShips>();
			let v = this.view;

			let start = new ys.Button('play_png');
			v.addChild(start);
			start.touchEnabled = true;
			ys.layoutCenter(start);
			start.once(egret.TouchEvent.TOUCH_TAP, () => {
				ys.removeDisplayObject(start);
				// ys.showLoading('加入中');
				let s = v.createShip(1, {});
				// s.x = ys.randomInt(0, ys.Context.STAGE_W);
				// s.y = ys.randomInt(0, ys.Context.STAGE_H);
				// v.followShip(s);
				// v.lookAt(s.x, s.y);
				v.followShip(s);
				this.initEvt();
			}, this);

		}

		initEvt() {
			let stage = ys.Context.STAGE;
			stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
			// stage.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.mouseMove, this);
			let self = this;
			document.body.onmousedown = function (e) {
				// if (e.button == 2) {
				// 	console.log("你点了右键");
				// } else if (e.button == 0) {
				// 	console.log("你点了左键");
				// } else if (e.button == 1) {
				// 	console.log("你点了滚轮");
				// }
				self.button = e.button;
			}
		}
		private button: number;
		private mouseMove(e: egret.TouchEvent) {
			// console.log(e.stageX, e.stageY);
			this.view.directioin.x = e.stageX;
			this.view.directioin.y = e.stageY;
		}

		private click(e: egret.TouchEvent) {
			// console.log(e);
			if (this.button == 0) {
				console.log("你点了左键");
				this.fire(e);
			} else if (this.button == 2) {
				console.log("你点了右键");
				this.move(e);
			}
		}

		private move(e: egret.TouchEvent) {
			let s = this.view.getShipById(1);
			let pt = this.view.scene.globalToLocal(e.stageX, e.stageY);
			this.view.moveShip(s, pt.x, pt.y);
		}

		private fire(e: egret.TouchEvent) {
			let s = this.view.getShipById(1);
			let pt = this.view.scene.globalToLocal(e.stageX, e.stageY);
			this.view.fireShip(s, pt.x, pt.y);

			let c = ys.newCircle(10, 0xff0000);
			c.x = pt.x;
			c.y = pt.y;
			this.view.scene.addChild(c);
		}

		Uninstall(): void {
		}
		/**列出需要关注的invoke */
		ListInvoke(): any[] {
			return [];
		}
		/**处理 invoke*/
		OnInvoke(handler: number | string, data: any): void {
		}
	}
}