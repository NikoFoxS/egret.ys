/**
 * 只负责界面元素的布局和样式。界面逻辑交给绑定的Mediator使用
 */
module ys {

	export class View extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		public addMediator(mediatorClass) {
			if (mediatorClass) {
				const m: ys.Mediator = new mediatorClass(this);
				m.$addLogic();
			}
		}

		protected onAdded() {

		}

		protected onRemove() {

		}

	}

	export class PageChangeHandler {
		public onChange(newView:egret.DisplayObject, oldView: egret.DisplayObject, next: Function): void {
			//1 页面切换逻辑
			//2 调用next();结束切换
		}
	}

	export class Page extends View {
		constructor(mediatorClass?: any, resGroup = '', reporter?: RES.PromiseTaskReporter) {
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

		public cache: boolean;

		private resReady(mediatorClass) {
			this.uiCreate();
			mediatorClass && this.addMediator(mediatorClass);
			this.once(egret.Event.ADDED_TO_STAGE, this.resize, this);
		}

		public resize(): void {
			stageW = stage.stageWidth;
			stageH = stage.stageHeight;
			stageHalfW = stageW >> 1;
			stageHalfH = stageH >> 1;
			this.uiLayout();
		}

		protected uiCreate(): void {

		}
		protected uiLayout(): void {

		}

		protected onAdded() {

		}

		protected onRemove() {

		}

	}


}