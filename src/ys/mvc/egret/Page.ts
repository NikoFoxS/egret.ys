namespace ys {
	export class Page extends ys.UI implements RES.PromiseTaskReporter {
		public constructor(resGroup: string = '') {
			super();
			if (resGroup != '') {
				if (RES.isGroupLoaded(resGroup)) {
					this.onStart();
				} else {
					(async () => {
						await RES.loadGroup(resGroup, 999, this);
						this.onStart();
					})();
				}
			} else {
				this.onStart();
			}
		}

		public cache:boolean;

		onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {

		}

		onStart() {

		}
	}

	export class PageChangeHandler {
		public onChange(newView: egret.DisplayObject, oldView: egret.DisplayObject, next: Function): void {
			//1 页面切换逻辑
			//2 调用next();结束切换
		}
	}
}
