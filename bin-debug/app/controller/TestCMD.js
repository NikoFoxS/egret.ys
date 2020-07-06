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
var TestCMD = (function (_super) {
    __extends(TestCMD, _super);
    function TestCMD() {
        return _super.call(this) || this;
    }
    TestCMD.prototype.execute = function (no) {
    };
    return TestCMD;
}(ys.NoticeCMD));
__reflect(TestCMD.prototype, "TestCMD");
//# sourceMappingURL=TestCMD.js.map