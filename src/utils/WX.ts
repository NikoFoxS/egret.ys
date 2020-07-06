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
class WX extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: WX;
	public static get GET(): WX {
		if (!WX._instance) {
			return WX._instance = new WX;
		}

		return WX._instance;
	}

	private key = `my_openid`;
	public get openid() {
		return egret.localStorage.getItem(this.key)
	}

	/**
	 * 微信Oauth授权  snsapi_base snsapi_userinfo
	 * */
	public checkOauth(scope: string, callback: Function, ref: any): void {
		//如果授权失败
		if (WEB.getURLParams('error')) {
			return;
		}

		var openid = egret.localStorage.getItem(this.key);
		if (openid) {
			//已经授权
			callback.call(ref, openid);
		} else {
			//如果授权成功，url?snsapi_base=openid;url?snsapi_userinfo=openid;
			var refresh_openid = WEB.getURLParams(scope);
			if (refresh_openid) {
				//存储到本地
				egret.localStorage.setItem(this.key, refresh_openid);
				window.location.replace(`https://${window.location.hostname}/${window.location.pathname}`);
			} else {
				//直接去授权
				// this.goOauth(scope);
				callback.call(ref, null);
			}
		}

	}

	/**
	 * 微信Oauth授权
	 */
	public goOauth(scope: string) {
		var type = 'b';
		if (scope == 'snsapi_userinfo') {
			type = 'i';
		}
		var project = window.location.pathname.split('/')[1];
		window.location.replace(`https://a.h5sun.com/t/${type}/${project}`);
	}

	public getUser(api: string, openid: string, callback: Function, ref: any): void {
		var a = new ys.Ajax();
		a.post(api, { openid: openid }, callback);
	}



	//微信分享签名

	private wxReady: boolean;

	private _appMessageTitle: string;
	private _appMessageDesc: string;
	private _appMessageLink: string;
	private _appMessageImgUrl: string;

	private _timelineTitle: string;
	private _timelineLink: string;
	private _timelineImgUrl: string;


	public set appMessageTitle(s: string) {
		this._appMessageTitle = s;
	}

	public set appMessageDesc(s: string) {
		this._appMessageDesc = s;
	}

	public set appMessageLink(s: string) {
		this._appMessageLink = s;
	}

	public set appMessageImgUrl(s: string) {
		this._appMessageImgUrl = s;
	}

	public set timelineTitle(s: string) {
		this._timelineTitle = s;
	}


	public set timelineLink(s: string) {
		this._timelineLink = s;
	}

	public set timelineImgUrl(s: string) {
		this._timelineImgUrl = s;
	}

	public setup(api: string, debug = false, apiList: string[] = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage"]): void {
		var self = this;
		var url = window.location.href;
		var a = new ys.Ajax();
		a.post(api, { url: url }, (status, resTxt) => {
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
			} else {
				console.log('签名接口失败', data)
			}
		});

	}

	public updateSetting(): void {
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
					title: this._appMessageTitle, // 分享标题
					desc: this._appMessageDesc, // 分享描述
					link: this._appMessageLink, // 分享链接
					imgUrl: this._appMessageImgUrl, // 分享图标
					success: function () {
						// 设置成功
					}
				})

				wx.updateTimelineShareData({
					title: this._timelineTitle, // 分享标题
					link: this._timelineLink, // 分享链接
					imgUrl: this._timelineImgUrl, // 分享图标
					success: function () {
						// 设置成功
					}
				})
			}


			if (wx.onMenuShareTimeline) {
				wx.onMenuShareTimeline({
					title: this._timelineTitle, // 分享标题
					link: this._timelineLink, // 分享链接
					imgUrl: this._timelineImgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						// event.dispatchEventWith("pengyouquan_ok");
						console.log('朋友圈2')
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						// event.dispatchEventWith("pengyouquan_cancel");

					}
				});

				wx.onMenuShareAppMessage({
					title: this._appMessageTitle, // 分享标题
					desc: this._appMessageDesc, // 分享描述
					link: this._appMessageLink, // 分享链接
					imgUrl: this._appMessageImgUrl, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
						// 用户确认分享后执行的回调函数
						// event.dispatchEventWith("pengyou_ok");
						console.log('朋友2')
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						// event.dispatchEventWith("pengyou_cancel");
					}
				});
			}

		}
	}


}