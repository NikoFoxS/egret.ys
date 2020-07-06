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
var ys;
(function (ys) {
    var List = (function (_super) {
        __extends(List, _super);
        function List(w, h) {
            var _this = _super.call(this) || this;
            var con = new egret.DisplayObjectContainer();
            _this.setContent(con, w, h);
            _this.index = 0;
            _this.lastY = 0;
            _this.itemsCon = con;
            _this.pt = new egret.Point();
            con.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.tapItem, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, function () {
                con.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.tapItem, _this);
            }, _this);
            return _this;
        }
        List.prototype.tapItem = function (e) {
            var item = e.target;
            this.dispatchEventWith(List.ITEM_SELECTED, false, item);
        };
        List.prototype.addItem = function (item) {
            item.y = this.lastY;
            item.render();
            this.itemsCon.addChild(item);
            item.visible = false;
            item.touchEnabled = true;
            this.lastY += item.itemH;
            item.index = this.index;
            this.index++;
        };
        List.prototype.getItem = function (index) {
            var con = this.itemsCon;
            var i = con.numChildren;
            var item;
            while (i--) {
                item = con.getChildAt(i);
                if (item.index == index) {
                    break;
                }
                item = null;
            }
            return item;
        };
        List.prototype.onScroll = function () {
            var con = this.itemsCon;
            var i = con.numChildren;
            while (i--) {
                var item = con.getChildAt(i);
                var p = item.localToGlobal(0, 0, this.pt);
                p = this.globalToLocal(p.x, p.y, this.pt);
                if (p.y < -item.itemH || p.y > this.scrollH) {
                    item.visible = false;
                }
                else {
                    item.visible = true;
                }
            }
        };
        List.ITEM_SELECTED = 'item_selected';
        return List;
    }(ys.VScrollBar));
    ys.List = List;
    __reflect(List.prototype, "ys.List");
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.onCreate();
            return _this;
        }
        ListItem.prototype.onCreate = function () {
        };
        Object.defineProperty(ListItem.prototype, "itemH", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ListItem.prototype.render = function () {
        };
        return ListItem;
    }(egret.DisplayObjectContainer));
    ys.ListItem = ListItem;
    __reflect(ListItem.prototype, "ys.ListItem");
})(ys || (ys = {}));
//# sourceMappingURL=List.js.map