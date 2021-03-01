module script {
	export class Request extends ys.Script {
		public constructor() {
			super();
		}

		//请求地址
		public url: string;
		//是否自动请求
		public auto: boolean = false;
		//请求类型
		public type: string = 'get';
		//引擎的数据
		public data: any;
		//返回的数据保存到数据key
		public dataKey: string = '';
		//数据返回后发送相应的通知
		public notify: string[] = [];

		public getData(): any {
			let obj = {};
			for (var key in this.data) {
				let val = this.data[key];
				if (typeof (val) == 'string' && val.indexOf("{{") == 0 && val.indexOf("}}") == val.length - 2) {
					obj[key] = ys.Model.get(val);
				} else {
					obj[key] = val;
				}
			}
			console.log('obj::', obj);
			return obj;
		}

		private check(res: any): void {
			if (res.code == 0) {
				ys.Model.set(this.dataKey, res.data);
				this.notify.forEach(val=>{
					ys.Subject.notify(val);
				})
			}
		}

		public create(): void {
			if (this.auto) {
				let a = new ys.Ajax();
				if (this.type == 'get') {
					a.get(this.url, this.getData(), () => {
						let res = a.responseJson;
						this.check(res);
					})
				} else {
					a.post(this.url, this.getData(), () => {
						let res = a.responseJson;
						this.check(res);
					})
				}
			}
		}

	}
}