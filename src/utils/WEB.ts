module WEB {

	export function getURLParams(name): any {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]); return null;
	}

	export function getVar(key: string): any {
		if (key.indexOf(".") != -1) {
			var arr: string[] = key.split(".");
			var info = window[arr[0]];
			if (info) {
				return info[arr[1]];
			} else {
				return "";
			}

		} else {
			return window[key];
		}

	}

	export function navigateToURL(url: string, replace: boolean = false): void {
		if (replace) {
			window.location.replace(url);
		} else {
			window.location.href = url;
		}
	}

	export var UA_WEIXIN: string = "micromessenger";
	export var UA_WEIBO: string = "weibo";
	export var UA_SUNING: string = "snebuy-app";
	export var UA_JD: string = "jdapp";
	export var UA_VIVO_BROWSER: string = "vivobrowser";
	export var UA_ALIPAY: string = 'aplipay';

	export function checkUserAgent(ua: string): boolean {
		var uas = navigator.userAgent.toLocaleLowerCase();
		var reg = new RegExp(ua, "i");
		if (uas.match(reg)) {
			return true;
		} else {
			return false;
		}
	}

    /**
     * 动态添加js到index.html
     */
	export function addJStoIndex(url, callback = null): void {
		var s = document.createElement('script');
		s.async = false;
		s.src = url;
		s.addEventListener('load', function () {
			callback && callback();
		}, false);
		document.body.appendChild(s);
	}

	export function showQrCode(url = null) {
		var uri = location.href;
		if (url) {
			uri = url;
		}
		console.info(uri);
		console.info("%c ", "opacity:.6;display:block;padding:50px;background:url('http://tool.oschina.net/action/qrcode/generate?data=" + encodeURIComponent(uri) + "&output=image%2Fgif&error=L&type=0&margin=4&size=4') no-repeat;background-size:contain;");
	};

	export function encodeB64(ss) {
		var ba = new egret.ByteArray();
		ba.writeUTF(ss);
		return egret.Base64Util.encode(ba.buffer);
	}

	export function decodeB64(ss) {
		var bu = egret.Base64Util.decode(ss);
		var ba = new egret.ByteArray(bu);
		return ba.readUTF();
	}

	export function Url() {
		//H5的url，去除?后端的参数
		return location.protocol + '//' + location.host + location.pathname;
	}

	export function disableContextmenu() {
		document.oncontextmenu = ()=>{return false;};
	}

}
