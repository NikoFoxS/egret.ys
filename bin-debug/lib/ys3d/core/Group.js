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
var ys3d;
(function (ys3d) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            var _this = _super.call(this) || this;
            _this.type = 'Group';
            _this.visible = true;
            return _this;
        }
        return Group;
    }(ys3d.Object3D));
    ys3d.Group = Group;
    __reflect(Group.prototype, "ys3d.Group");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Group.js.map