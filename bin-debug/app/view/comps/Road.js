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
var Road = (function (_super) {
    __extends(Road, _super);
    function Road() {
        var _this = _super.call(this) || this;
        var bm = GG.newBitmap('road_jpg');
        return _this;
    }
    return Road;
}(egret.DisplayObjectContainer));
__reflect(Road.prototype, "Road");
//# sourceMappingURL=Road.js.map