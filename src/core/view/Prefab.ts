module ys {
	export class Node {
		type: string;
		prop: any;
		child: any[];
		group: string;
	}

	export class Prefab extends ys.Container {
		constructor() {
			super();
		}

		public getVar<T>(name: string): T {
			return this.vars[name];
		}

		// public src: string = '';
		public set src(src: string) {
			if (src != '') {
				if (src.indexOf(".json") == -1) {
					this.json = RES.getRes(src);
				} else {
					RES.getResByUrl(src, (json) => {
						this.json = json;
						// console.log(json)
					}, this, RES.ResourceItem.TYPE_JSON);
				}
			}
		}

		public set json(json: any) {
			this.createViewByJson(json);
		}

		private async createViewByJson(json: any) {
			if (json.hasOwnProperty("group")) {
				let group = json.group;
				if (group != '') {
					await RES.loadGroup(group);
				}
			}
			this.createView(json);
		}

		private createChild(node: Node, parent: ys.Container): void {
			if (node.child) {
				let len = node.child.length;
				for (let i = 0; i < len; i++) {
					let n = node.child[i];
					this.createView(n, parent);
				}
			}
		}

		private createView(node: Node, parent: egret.DisplayObjectContainer = null): any {
			let classDef = egret.getDefinitionByName(node.type);
			console.log(node.type)
			let prop = node.prop;
			if (!classDef) {
				this.attachProp(this, prop);
				this.createChild(node, this);
				this.layout(this);
			} else {
				let d = new classDef();
				if (parent) {
					console.log(":::", d, prop)
					this.attachProp(d, prop);
					if (d instanceof ys.Script) {
						//脚本特殊处理
						d.owner = parent;
						d.view = this;
						d.onAdded();
						parent.once(egret.Event.REMOVED_FROM_STAGE, () => {
							d.onRemove();
						}, this);
					}
					else {
						if (parent instanceof ys.ScrollView) {
							//scrollView脚本特殊处理
							parent.setContent(d);
						} else if (parent instanceof ys.VScrollBar) {
							//VScrollBar脚本特殊处理
							parent.setContent(d, parent.width, parent.height);
						}
						else {
							//默认显示对象
							parent.addChild(d);
						}

						//ys.Prefab会自动创建
						if (node.type != 'ys.Prefab') {
							this.createChild(node, d);
						}
						this.layout(d);
					}

				}
			}

		}

		private vars: any;
		protected attachProp(d: any, prop: any): void {
			if (prop) {
				for (var key in prop) {
					d[key] = prop[key];
				}
				if (prop.hasOwnProperty('var')) {
					if (!this.vars) {
						this.vars = {};
					}
					this.vars[prop.var] = d;
				}
			}

			try {
				//如果有create方法
				d.$create && d.$create();
			} catch (error) {
			}

			if (d.parent) {
				this.layout(d);
			}
		}

		protected layout(d: any): void {
			let pa = d.parent;
			if (pa) {
				let val = 0;
				let refWidth = pa.width;
				if (pa.hasOwnProperty('Width')) {
					if (typeof (pa.Width) == 'string') {
						refWidth = egret.getDefinitionByName(pa.Width);
					} else {
						refWidth = pa.Width;
					}
				}
				let refHeight = pa.height;
				if (pa.hasOwnProperty('Height')) {
					if (typeof (pa.Height) == 'string') {
						refHeight = egret.getDefinitionByName(pa.Height);
					} else {
						refHeight = pa.Height;
					}
				}

				// console.log("layout", pa.width, pa.height, refWidth, refHeight);

				if (d.hasOwnProperty('left')) {
					val = d.left;
					ys.Layout.left(d, val);
				}
				if (d.hasOwnProperty('right')) {
					val = d.right;
					ys.Layout.right(d, val, refWidth)
				}
				if (d.hasOwnProperty('centerX')) {
					val = d.centerX;
					ys.Layout.centerX(d, val, refWidth)
				}
				if (d.hasOwnProperty('top')) {
					val = d.top;
					ys.Layout.top(d, val);
				}
				if (d.hasOwnProperty('bottom')) {
					val = d.bottom;
					ys.Layout.bottom(d, val, refHeight);
				}
				if (d.hasOwnProperty('centerY')) {
					val = d.centerY;
					ys.Layout.centerY(d, val, refHeight);
				}
			}

		}

	}
}