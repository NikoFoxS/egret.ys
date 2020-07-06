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
 * 配置项
 */
var cfg = new Config();
cfg.groups = ['preload']; //配置加载资源组
cfg.resourceJSON = 'resource/default.res.json'; //配置default.res.json的路径
cfg.resourceRoot = 'resource/'; //配置资源的路径
cfg.release = false; // 如果未true，会自动屏蔽掉console.log
cfg.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
cfg.orientation = egret.OrientationMode.PORTRAIT;
cfg.width = 750;
cfg.height = 1334; // iphone6=750x1334 iphoneX=750x1624
cfg.proxy = []; //添加数据代理
cfg.command = [TestCMD]; //添加通知指令
cfg.mock = false;
//对加载项进行处理
cfg.versionFun = function (url) {
    console.log('加载', url);
    return url;
};
//处理多语言。
ys.Label.getLocale = function (key) {
    var val = key;
    // console.log('多语言', key, '>', val);
    return val;
};
// console.log('??',location.href);
//加载报告，只负责报告。显示需要另外处理。
var MyLoadingReporter = (function (_super) {
    __extends(MyLoadingReporter, _super);
    function MyLoadingReporter() {
        return _super.call(this) || this;
    }
    MyLoadingReporter.prototype.onReady = function () {
        //
        this.view = new LoadingUI();
        stage.addChild(this.view);
    };
    MyLoadingReporter.prototype.onStart = function (groupName) {
        console.log(groupName, 'start');
    };
    MyLoadingReporter.prototype.onProgress = function (current, total, resItem) {
        // console.log(current, total, resItem)
        this.view.onProgress(current, total);
    };
    MyLoadingReporter.prototype.onLoaded = function (groupName) {
        this.view.onLoaded(groupName);
        if (groupName == 'preload') {
            GG.removeDisplayObject(this.view);
            // let start = new app.TestView();
            // main.addChild(start);
            GG.showPage(app.TestView, null);
        }
    };
    return MyLoadingReporter;
}(ys.LoadingReporter));
__reflect(MyLoadingReporter.prototype, "MyLoadingReporter");
/**
 * 主入口
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.call(this, cfg, new MyLoadingReporter) || this;
    }
    return Main;
}(Application));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map