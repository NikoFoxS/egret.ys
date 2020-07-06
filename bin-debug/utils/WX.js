var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * // cfg.api = '';//后端接口
//前端发起微信授权
// cfg.wx_Oauth = '';//snsapi_base snsapi_userinfo
//设置微信分享
// cfg.wx_share_debug = false;
// cfg.wx_share_app_title = '分享朋友标题'; //微信分享朋友标题 <20字
// cfg.wx_share_app_desc = '分享朋友描述';   //微信分享朋友描述 <30字
// cfg.wx_share_timeline_title = '分享朋友圈标题'; //微信分享朋友圈标题 <30字
// cfg.wx_share_icon = 'http://t.h5sun.com/share.png'; //微信分享icon 300x300
// cfg.wx_share_link = WEB.Url();
// cfg.wx_share_signature = 'https://a.h5sun.com/p/api/wx/sign.htm';

//var api = cfg.wx_share_signature;
        // var debug = cfg.wx_share_debug;
        // if (WEB.checkUserAgent(WEB.UA_WEIXIN)) {
        // 	WX.GET.setup(api, debug);

        // 	WX.GET.appMessageTitle = cfg.wx_share_app_title;
        // 	WX.GET.appMessageDesc = cfg.wx_share_app_desc;
        // 	WX.GET.appMessageLink = cfg.wx_share_link;
        // 	WX.GET.appMessageImgUrl = cfg.wx_share_icon;

        // 	WX.GET.timelineTitle = cfg.wx_share_timeline_title;
        // 	WX.GET.timelineLink = cfg.wx_share_link;
        // 	WX.GET.timelineImgUrl = cfg.wx_share_icon;
        // 	WX.GET.updateSetting();
        // }
 */
var WX = (function (_super) {
    __extends(WX, _super);
    function WX() {
        var _this = _super.call(this) || this;
        _this.key = "my_openid";
        return _this;
    }
    Object.defineProperty(WX, "GET", {
        get: function () {
            if (!WX._instance) {
                return WX._instance = new WX;
            }
            return WX._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "openid", {
        get: function () {
            return egret.localStorage.getItem(this.key);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 微信Oauth授权  snsapi_base snsapi_userinfo
     * */
    WX.prototype.checkOauth = function (scope, callback, ref) {
        //如果授权失败
        if (WEB.getURLParams('error')) {
            return;
        }
        var openid = egret.localStorage.getItem(this.key);
        if (openid) {
            //已经授权
            callback.call(ref, openid);
        }
        else {
            //如果授权成功，url?snsapi_base=openid;url?snsapi_userinfo=openid;
            var refresh_openid = WEB.getURLParams(scope);
            if (refresh_openid) {
                //存储到本地
                egret.localStorage.setItem(this.key, refresh_openid);
                window.location.replace("https://" + window.location.hostname + "/" + window.location.pathname);
            }
            else {
                //直接去授权
                // this.goOauth(scope);
                callback.call(ref, null);
            }
        }
    };
    /**
     * 微信Oauth授权
     */
    WX.prototype.goOauth = function (scope) {
        var type = 'b';
        if (scope == 'snsapi_userinfo') {
            type = 'i';
        }
        var project = window.location.pathname.split('/')[1];
        window.location.replace("https://a.h5sun.com/t/" + type + "/" + project);
    };
    WX.prototype.getUser = function (api, openid, callback, ref) {
        var a = new ys.Ajax();
        a.post(api, { openid: openid }, callback);
    };
    Object.defineProperty(WX.prototype, "appMessageTitle", {
        set: function (s) {
            this._appMessageTitle = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "appMessageDesc", {
        set: function (s) {
            this._appMessageDesc = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "appMessageLink", {
        set: function (s) {
            this._appMessageLink = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "appMessageImgUrl", {
        set: function (s) {
            this._appMessageImgUrl = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "timelineTitle", {
        set: function (s) {
            this._timelineTitle = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "timelineLink", {
        set: function (s) {
            this._timelineLink = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX.prototype, "timelineImgUrl", {
        set: function (s) {
            this._timelineImgUrl = s;
        },
        enumerable: true,
        configurable: true
    });
    WX.prototype.setup = function (api, debug, apiList) {
        if (debug === void 0) { debug = false; }
        if (apiList === void 0) { apiList = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage"]; }
        var self = this;
        var url = window.location.href;
        var a = new ys.Ajax();
        a.post(api, { url: url }, function (status, resTxt) {
            var data = JSON.parse(resTxt);
            if (status == 200 && data.code == 0) {
                var wx = window['wx'];
                if (wx) {
                    wx.ready(function () {
                        self.wxReady = true;
                        self.updateSetting();
                    });
                    var result = data.data;
                    // console.log(result);
                    wx.config({
                        debug: debug,
                        appId: result['appId'],
                        timestamp: result['timestamp'],
                        nonceStr: result['nonceStr'],
                        signature: result['signature'],
                        jsApiList: apiList
                    });
                }
            }
            else {
                console.log('签名接口失败', data);
            }
        });
    };
    WX.prototype.updateSetting = function () {
        if (this.wxReady) {
            var wx = window["wx"];
            //标题不能为空字符串，不然设置失败。
            if (this._appMessageTitle == "") {
                this._appMessageTitle = " ";
            }
            if (this._timelineTitle == "") {
                this._timelineTitle = " ";
            }
            //标题不能为空字符串，不然设置失败。
            if (wx.updateAppMessageShareData) {
                wx.updateAppMessageShareData({
                    title: this._appMessageTitle,
                    desc: this._appMessageDesc,
                    link: this._appMessageLink,
                    imgUrl: this._appMessageImgUrl,
                    success: function () {
                        // 设置成功
                    }
                });
                wx.updateTimelineShareData({
                    title: this._timelineTitle,
                    link: this._timelineLink,
                    imgUrl: this._timelineImgUrl,
                    success: function () {
                        // 设置成功
                    }
                });
            }
            if (wx.onMenuShareTimeline) {
                wx.onMenuShareTimeline({
                    title: this._timelineTitle,
                    link: this._timelineLink,
                    imgUrl: this._timelineImgUrl,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        // event.dispatchEventWith("pengyouquan_ok");
                        console.log('朋友圈2');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        // event.dispatchEventWith("pengyouquan_cancel");
                    }
                });
                wx.onMenuShareAppMessage({
                    title: this._appMessageTitle,
                    desc: this._appMessageDesc,
                    link: this._appMessageLink,
                    imgUrl: this._appMessageImgUrl,
                    type: 'link',
                    dataUrl: '',
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        // event.dispatchEventWith("pengyou_ok");
                        console.log('朋友2');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        // event.dispatchEventWith("pengyou_cancel");
                    }
                });
            }
        }
    };
    return WX;
}(egret.EventDispatcher));
__reflect(WX.prototype, "WX");
//# sourceMappingURL=WX.js.map