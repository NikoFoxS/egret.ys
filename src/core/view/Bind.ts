module ys {
	export class Bind implements IObserver {
		public constructor() {
			this.list = [];
		}
		private _owner: egret.DisplayObject;
		set owner(o) {
			if (!this._owner) {
				this._owner = o;
				ys.Subject.registerObserver(this);
				o.once(egret.Event.REMOVED_FROM_STAGE, () => {
					ys.Subject.removeObserver(this);
					this._binds = [];
					this._owner = null;
				}, this);
			}
		}
		private _binds: any[];
		set binds(arr: any[]) {
			this._binds = arr;
			
			arr.forEach(obj => {
				for (var key in obj) {
					let val = obj[key];
					val = val.replace("{{", "");
					val = val.replace("}}", "");
					this.list.push(val);
					val = ys.Model.get(val);
					if (val) {
						this._owner[key] = val;
					}
					console.log(this.list);
					console.log(key,val);

				}
			})
		}

		private list: string[];
		listNotification(): any[] {
			return this.list;
		}

		onNotification(name: any, data: any) {
			let len = this._binds.length;
			for (let i = 0; i < len; i++) {
				let obj = this._binds[i];
				for (var key in obj) {
					let val = obj[key];
					val = val.replace("{{", "");
					val = val.replace("}}", "");
					if (val == name) {
						val = ys.Model.get(val);
						console.log("update prop",this._owner,key,val)
						if (val) {
							this._owner[key] = val;
						}
					}
				}

			}
		}


	}
}