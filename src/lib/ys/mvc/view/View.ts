/**
 * 只负责界面元素的布局和样式。界面逻辑交给绑定的Mediator使用
 */
module ys {

	export class View extends egret.DisplayObjectContainer {
		/**
		 * @param mediatorClass 
		 * @param resGroup 资源组
		 * @param reporter 报告加载进度
		 */
		public constructor(mediatorClass, resGroup = '', reporter?: RES.PromiseTaskReporter) {
			super();
			if (resGroup != '') {
				if (RES.isGroupLoaded(resGroup)) {
					this.resReady(mediatorClass);
				} else {
					(async () => {
						await RES.loadGroup(resGroup, 1, reporter);
						this.resReady(mediatorClass);
					})();
				}
			} else {
				this.resReady(mediatorClass);
			}
		}

		public static newBitmap(res: string): egret.Bitmap {
			const bm = new egret.Bitmap();
			bm.texture = RES.getRes(res);
			return bm;
		}

		public static newContainer(): egret.DisplayObjectContainer {
			const con = new egret.DisplayObjectContainer();
			return con;
		}

		public static newShape(): egret.Shape {
			const s = new egret.Shape();
			return s;
		}

		public static newTextInput(w, h): ys.TextInput {
			const input = new ys.TextInput(w, h);
			return input;
		}

		public static newLabel(): ys.Label {
			const label = new ys.Label();
			return label;
		}

		public static newImage(): ys.Image {
			const img = new ys.Image();
			return img;
		}

		public static newButton(res): ys.Button {
			const btn = new ys.Button(res);
			return btn;
		}

		public static newButtonMusic(res1, res2): ys.ButtonMusic {
			const music = new ys.ButtonMusic(res1, res2);
			return music;
		}

		public static newRect(w, h, color): egret.Shape {
			const rec = new egret.Shape();
			const g = rec.graphics;
			g.beginFill(color);
			g.drawRect(0, 0, w, h);
			g.endFill();
			return rec;
		}

		public static newCircle(r, color): egret.Shape {
			const s: egret.Shape = new egret.Shape();
			s.graphics.beginFill(color);
			s.graphics.drawCircle(0, 0, r);
			s.graphics.endFill();
			return s;
		}

		public static newRectRound(w, h, color, cornerW, cornerH) {
			const rec = new egret.Shape();
			const g = rec.graphics;
			g.beginFill(color);
			g.drawRoundRect(0, 0, w, h, cornerW, cornerH);
			g.endFill();
			return rec;
		}

		private resReady(mediatorClass) {
			this.uiCreate();
			if (mediatorClass) {
				const m = new mediatorClass(this);
				m.$addLogic();
			}
			this.once(egret.Event.ADDED_TO_STAGE, this.resize, this);
		}

		public resize(): void {
			stageW = stage.stageWidth;
			stageH = stage.stageHeight;
			stageHalfW = stageW >> 1;
			stageHalfH = stageH >> 1;
			this.uiLayout();
		}
		/**创建ui */
		protected uiCreate(): void {

		}
		/**布局ui */
		protected uiLayout(): void {

		}

	}

}