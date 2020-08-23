module ys {
	
	/**封装ajax */
	export class Ajax {
		constructor() {
		}
		/**如果为true，ajax不会真正执行，会截断直接callback */
		public static mock: boolean;
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

		private _status:number=200;
		public get status()
		{
			return this._status;
		}
		private _responseText:string='';
		public get responseText()
		{
			return this._responseText;
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
					callback();
				}
			};
			if (method == 'POST') {
				x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
			x.send(data);
		}

		public post(url, data, callback, async = true) {
			if (Ajax.mock) {
				callback(null);
				return;
			}
			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url, callback, 'POST', query.join('&'), async);
		}

		public get(url, data, callback, async = true) {
			if (Ajax.mock) {
				callback(null);
				return;
			}
			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
		}
	}
}
