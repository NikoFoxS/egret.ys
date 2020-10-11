module ys {

	/**封装ajax */
	export class Ajax {
		constructor() {
		}

		private static mock: ys.Mock;
		public static setupMock(mock: ys.Mock) {
			Ajax.mock = mock;
		}

		private xhr() {
			if (typeof XMLHttpRequest !== 'undefined') {
				return new XMLHttpRequest();
			}
			var versions = [
				"MSXML2.XmlHttp.6.0",
				"MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"
			];
			var xhr;
			for (var i = 0; i < versions.length; i++) {
				try {
					xhr = new window['ActiveXObject'](versions[i]);
					break;
				} catch (e) {
				}
			}
			return xhr;
		}

		private _status: number = 200;
		public get status() {
			return this._status;
		}
		private _responseText: string = '';
		public get responseText() {
			return this._responseText;
		}
		public get responseJson() {
			return JSON.parse(this._responseText);
		}

		private send(url, callback, method, data, async) {
			if (async === undefined) {
				async = true;
			}
			const self = this;
			var x = this.xhr();
			x.open(method, url, async);
			x.onreadystatechange = function () {
				if (x.readyState == 4) {
					self._status = x.status;
					self._responseText = x.responseText;
					callback(x.status, x.responseText);
				} else {
					callback('error', '');
				}
			};
			if (method == 'POST') {
				x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
			x.send(data);
		}

		public post(url, data, callback, async = true) {
			if (Ajax.mock) {
				let res = Ajax.mock.response(url, data);
				if (res) {
					this._responseText = JSON.stringify(res);
					callback(null, res);
					return;
				}
			}

			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url, callback, 'POST', query.join('&'), async);
		}

		public get(url, data, callback, async = true) {
			if (Ajax.mock) {
				let res = Ajax.mock.response(url, data);
				if (res) {
					this._responseText = JSON.stringify(res);
					callback(null, res);
					return;
				}
			}

			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
		}

		// public postAsync(url, data) {
		// 	return new Promise((resolve, reject) => {
		// 		this.post(url, data, (status, responseText) => {
		// 			resolve(responseText);
		// 		});
		// 	})
		// }

		// public getAsync(url, data) {
		// 	return new Promise((resolve, reject) => {
		// 		this.get(url, data, (status, responseText) => {
		// 			resolve(responseText);
		// 		});
		// 	})
		// }
	}
}
