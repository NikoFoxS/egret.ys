var WEB;
(function (WEB) {
    function getURLParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    WEB.getURLParams = getURLParams;
    function getVar(key) {
        if (key.indexOf(".") != -1) {
            var arr = key.split(".");
            var info = window[arr[0]];
            if (info) {
                return info[arr[1]];
            }
            else {
                return "";
            }
        }
        else {
            return window[key];
        }
    }
    WEB.getVar = getVar;
    function navigateToURL(url, replace) {
        if (replace === void 0) { replace = false; }
        if (replace) {
            window.location.replace(url);
        }
        else {
            window.location.href = url;
        }
    }
    WEB.navigateToURL = navigateToURL;
    WEB.UA_WEIXIN = "micromessenger";
    WEB.UA_WEIBO = "weibo";
    WEB.UA_SUNING = "snebuy-app";
    WEB.UA_JD = "jdapp";
    WEB.UA_VIVO_BROWSER = "vivobrowser";
    WEB.UA_ALIPAY = 'aplipay';
    function checkUserAgent(ua) {
        var uas = navigator.userAgent.toLocaleLowerCase();
        var reg = new RegExp(ua, "i");
        if (uas.match(reg)) {
            return true;
        }
        else {
            return false;
        }
    }
    WEB.checkUserAgent = checkUserAgent;
    /**
     * 动态添加js到index.html
     */
    function addJStoIndex(url, callback) {
        if (callback === void 0) { callback = null; }
        var s = document.createElement('script');
        s.async = false;
        s.src = url;
        s.addEventListener('load', function () {
            callback && callback();
        }, false);
        document.body.appendChild(s);
    }
    WEB.addJStoIndex = addJStoIndex;
    function showQrCode(url) {
        if (url === void 0) { url = null; }
        var uri = location.href;
        if (url) {
            uri = url;
        }
        console.info(uri);
        console.info("%c ", "opacity:.6;display:block;padding:50px;background:url('http://tool.oschina.net/action/qrcode/generate?data=" + encodeURIComponent(uri) + "&output=image%2Fgif&error=L&type=0&margin=4&size=4') no-repeat;background-size:contain;");
    }
    WEB.showQrCode = showQrCode;
    ;
    function encodeB64(ss) {
        var ba = new egret.ByteArray();
        ba.writeUTF(ss);
        return egret.Base64Util.encode(ba.buffer);
    }
    WEB.encodeB64 = encodeB64;
    function decodeB64(ss) {
        var bu = egret.Base64Util.decode(ss);
        var ba = new egret.ByteArray(bu);
        return ba.readUTF();
    }
    WEB.decodeB64 = decodeB64;
    function Url() {
        //H5的url，去除?后端的参数
        return location.protocol + '//' + location.host + location.pathname;
    }
    WEB.Url = Url;
})(WEB || (WEB = {}));
//# sourceMappingURL=WEB.js.map