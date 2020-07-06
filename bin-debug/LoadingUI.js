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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        var rec = GG.newRect(stageW, stageH, 0x000000);
        _this.addChild(rec);
        _this.label = GG.newLabel(0xffffff, 30, _this); //GG.newText(0xffffff,30,this);
        _this.label.textAlign = 'center';
        _this.label.width = stageW;
        _this.label.y = stageHalfH;
        return _this;
    }
    LoadingUI.prototype.onLoaded = function (group) {
    };
    LoadingUI.prototype.onProgress = function (loaded, total) {
        var per = 100 * loaded / total;
        this.label.text = 'Loading ' + per.toFixed() + '%';
    };
    return LoadingUI;
}(egret.DisplayObjectContainer));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map