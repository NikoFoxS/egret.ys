var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    /**布局,可忽略锚点 */
    var Layout = (function () {
        function Layout() {
        }
        /**
         * 处于编辑状态的显示对象，透明位置会自动填充红色，已方便查看边界
         * 只能移动操作。通过type限制移动方向
         */
        Layout.prototype.edit = function (d, type) {
            var _this = this;
            if (type === void 0) { type = ''; }
            d.touchEnabled = true;
            var tx, ty;
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                tx = e.stageX;
                ty = e.stageY;
            }, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
                var dx = e.stageX - tx;
                var dy = e.stageY - ty;
                type == 'x' && (dy = 0);
                type == 'y' && (dx = 0);
                d.x += dx;
                d.y += dy;
                tx = e.stageX;
                ty = e.stageY;
            }, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.showLayout(d);
            }, this);
            var vs = "\n\t\t\tattribute vec2 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tattribute vec2 aColor;\n\t\t\tuniform vec2 projectionVector;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tconst vec2 center = vec2(-1.0, 1.0);\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}\n\t\t\t";
            var fs = "\n\t\t\tprecision lowp float;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tvarying vec4 vColor;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tvec2 uvs = vTextureCoord.xy;\n\t\t\t\tvec4 fg = texture2D(uSampler, vTextureCoord);\n\t\t\t\tfg += vec4(1.0,0.0,0.0,0.5);\n\t\t\t\tgl_FragColor = fg;\n\t\t\t}\n\t\t\t";
            var shader = new egret.CustomFilter(vs, fs, {});
            d.filters = [shader];
        };
        Layout.prototype.showLayout = function (d) {
            if (d) {
                console.log('--- layout值 ---');
                //left
                var val = void 0;
                val = d.x - d.anchorOffsetX;
                console.log('left', val);
                //right
                val = stageW - d.width + d.anchorOffsetX - d.x;
                console.log('right', val);
                //top
                val = d.y - d.anchorOffsetY;
                console.log('top', val);
                console.log('top vh', val / stageH);
                //bottom
                val = stageH - d.height + d.anchorOffsetY - d.y;
                console.log('bottom', val);
                //middleX
                val = stageHalfW - d.width * 0.5 + d.anchorOffsetX - d.x;
                val = -val;
                console.log('middleX', val);
                //middleY
                val = stageHalfH - d.height * 0.5 + d.anchorOffsetY - d.y;
                val = -val;
                console.log('middleY', val);
            }
        };
        Layout.prototype.left = function (d, left) {
            d.x = left + d.anchorOffsetX;
        };
        Layout.prototype.right = function (d, right) {
            d.x = stageW - d.width + d.anchorOffsetX - right;
        };
        Layout.prototype.middleX = function (d, offset) {
            if (offset === void 0) { offset = 0; }
            d.x = stageHalfW - d.width * 0.5 + d.anchorOffsetX + offset;
        };
        Layout.prototype.middleY = function (d, offset) {
            if (offset === void 0) { offset = 0; }
            d.y = stageHalfH - d.height * 0.5 + d.anchorOffsetY + offset;
        };
        Layout.prototype.top = function (d, top) {
            d.y = top + d.anchorOffsetY;
        };
        Layout.prototype.bottom = function (d, bottom) {
            d.y = stageH - d.height + d.anchorOffsetY - bottom;
        };
        Layout.prototype.vh = function (d, vh) {
            d.y = stageH * vh;
        };
        return Layout;
    }());
    ys.Layout = Layout;
    __reflect(Layout.prototype, "ys.Layout");
})(ys || (ys = {}));
//# sourceMappingURL=Layout.js.map