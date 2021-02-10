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

	export interface IProps {
		updateProp(prop: any): void;
	}

	export class Props {
		layout(d: any, prop: any): void {
			if (prop.hasOwnProperty('left')) {
				d.left = prop.left;
			}

			if (prop.hasOwnProperty('right')) {
				d.right = prop.right;
			}

			if (prop.hasOwnProperty('centerX')) {
				d.centerX = prop.centerX;
			}

			if (prop.hasOwnProperty('top')) {
				d.top = prop.top;
			}

			if (prop.hasOwnProperty('bottom')) {
				d.bottom = prop.bottom;
			}

			if (prop.hasOwnProperty('centerY')) {
				d.centerY = prop.centerY;
			}
		}

	}

	export class Node {
		type: string;
		prop: any;
		child: any[];
		group: string;
	}

	export class View {
		public constructor() {
		}


		private _view: ys.Container;
		public get view(): ys.Container {
			return this._view;
		}

		public getDisplayObject<T>(name: string): T {
			let arr = name.split('.');
			let len = arr.length;
			let d = null;
			let parent = null;
			for (let i = 0; i < len; i++) {
				if (parent && parent instanceof egret.DisplayObjectContainer) {
					d = parent.getChildByName(arr[i]);
				} else {
					d = this.view.getChildByName(arr[i]);
				}

				if (!d) {
					break;
				}

				parent = d;
			}
			return d;
		}

		public createViewByJson(json: any): void {
			this.create(json);
		}

		private layout(d: any, prop: any, refWidth: number, refHeight: number): void {
			let val = 0;
			if (prop.hasOwnProperty('left')) {
				val = prop.left;
				ys.Layout.left(d, val);
			}

			if (prop.hasOwnProperty('right')) {
				// d.right = prop.right;
				val = prop.right;
				ys.Layout.right(d, val, refWidth)
			}

			if (prop.hasOwnProperty('centerX')) {
				// d.centerX = prop.centerX;
				val = prop.centerX;
				ys.Layout.centerX(d, val, refWidth)
			}

			if (prop.hasOwnProperty('top')) {
				// d.top = prop.top;
				val = prop.top;
				ys.Layout.top(d, val);
			}

			if (prop.hasOwnProperty('bottom')) {
				// d.bottom = prop.bottom;
				val = prop.bottom;
				ys.Layout.bottom(d, val, refHeight);
			}

			if (prop.hasOwnProperty('centerY')) {
				// d.centerY = prop.centerY;
				val = prop.centerY;
				ys.Layout.centerY(d, val, refHeight);
			}
		}

		private updateProp(d: any, prop: any, refWidth: number, refHeight: number): void {

			for (var key in prop) {
				if (prop.hasOwnProperty(key)) {
					d[key] = prop[key];
				}
			}

			this.layout(d, prop, refWidth, refHeight);
		}

		private createChild(node: Node, parent: ys.Container): void {
			if (node.child) {
				let len = node.child.length;
				for (let i = 0; i < len; i++) {
					let n = node.child[i];
					this.create(n, parent);
				}
			}

		}

		private create(node: Node, parent: egret.DisplayObjectContainer = null): any {
			let classDef = egret.getDefinitionByName(node.type);
			console.log('create', node.type, node.prop);
			if (classDef) {
				let refW = ys.Context.stageW;
				let refH = ys.Context.stageH;
				let d = new classDef();
				if (parent) {

					if (d instanceof ys.Script) {
						d.owner = parent;
						d.onAdded();
						parent.once(egret.Event.REMOVED_FROM_STAGE,()=>{
							d.onRemove();
						},this);
					} else {
						parent.addChild(d);
						this.createChild(node, d);
						//获取父级的宽和高
						refW = parent.width;
						refH = parent.height;
					}
				} else {
					//最外层ys.Container
					this._view = d;
					this.createChild(node, d);
				}
				this.updateProp(d, node.prop, refW, refH)
			}
		}

	}
}