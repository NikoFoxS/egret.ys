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
    var BoxNode = (function (_super) {
        __extends(BoxNode, _super);
        //前 后 左 右 上 下
        function BoxNode(faces) {
            var _this = _super.call(this) || this;
            _this._size = 0;
            _this.faces = [];
            if (faces.length) {
                var f = faces[0];
                var size = f.width;
                var i = 0;
                var len = 6;
                while (i < len) {
                    var face = faces[i];
                    if (face) {
                        var pl = new ys3d.PlaneNode(face);
                        _this.addChild(pl);
                        _this.faces.push(pl);
                    }
                    else {
                        _this.faces.push(null);
                    }
                    i++;
                }
                _this.size = size;
            }
            return _this;
        }
        Object.defineProperty(BoxNode.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (v) {
                var _this = this;
                this._size = v;
                // console.log(this.size);
                this.faces.forEach(function (pl, index) {
                    if (pl) {
                        _this.updateFace(pl, v * 0.5, index);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        BoxNode.prototype.updateFace = function (pl, size, i) {
            switch (i) {
                case 0:
                    pl.position.set(0, 0, size);
                    pl.name = '前';
                    break;
                case 1:
                    pl.position.set(0, 0, -size);
                    pl.rotation.y = 180;
                    pl.name = '后';
                    break;
                case 2:
                    pl.position.set(-size, 0, 0);
                    pl.rotation.y = -90;
                    pl.name = '左';
                    break;
                case 3:
                    pl.position.set(size, 0, 0);
                    pl.rotation.y = 90;
                    pl.name = '右';
                    break;
                case 4:
                    pl.position.set(0, size, 0);
                    pl.rotation.x = 90;
                    pl.name = '上';
                    break;
                case 5:
                    pl.position.set(0, -size, 0);
                    pl.rotation.x = -90;
                    pl.name = '下';
                    break;
            }
            return pl;
        };
        return BoxNode;
    }(ys3d.Group));
    ys3d.BoxNode = BoxNode;
    __reflect(BoxNode.prototype, "ys3d.BoxNode");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=BoxNode.js.map