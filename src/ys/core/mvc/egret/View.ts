namespace ys {
	export class View extends ys.UI implements RES.PromiseTaskReporter {
		/**
		 * @param resGroup 资源组
		 */
		public constructor(resGroup: string) {
			super();
			if (resGroup != '') {
				if (RES.isGroupLoaded(resGroup)) {
					this.OnStart();
				} else {
					(async () => {
						await RES.loadGroup(resGroup, 999, this);
						this.OnStart();
					})();
				}
			} else {
				this.OnStart();
			}
		}

		public cache: boolean;

		onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
			ys.logger_log(current, total);
		}

		OnStart() {
			throw new Error('必须重写 OnStart()')
		}
	}

	export class PageChangeHandler {
		public onChange(newView: egret.DisplayObject, oldView: egret.DisplayObject, next: Function): void {
			//1 页面切换逻辑
			//2 调用next();结束切换
		}
	}
}
