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
var ScrollTile = (function (_super) {
    __extends(ScrollTile, _super);
    function ScrollTile(texture, divid, mode) {
        if (divid === void 0) { divid = 3; }
        if (mode === void 0) { mode = 'height'; }
        var _this = _super.call(this) || this;
        _this.texture = texture;
        var scale = stageW / stageH;
        var dw, dh;
        if (mode == 'height') {
            dh = 1 / divid;
            dw = 1 / divid / scale;
            _this._maxSize = stageH;
        }
        else {
            dh = 1 / divid * scale;
            dw = 1 / divid;
            _this._maxSize = stageW;
        }
        var vs = "\n\t\tattribute vec2 aVertexPosition; //\u9002\u914D\u5C4F\u5E55\u540E\u7684xy\u5750\u6807,\u4E0D\u7528\u8FD9\u4E2A\n\t\tattribute vec2 aTextureCoord;\n\t\tattribute vec4 aColor;\n\t\tuniform vec2 projectionVector;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tconst vec2 center = vec2(-1.0, 1.0);\n\t\tvoid main(void) {\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvColor = aColor;\n\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t}\n\t\t";
        var fs = "\n\t\tprecision lowp float;\n\t\tvarying vec2 vTextureCoord;\n\t\tuniform sampler2D uSampler;\n\n\t\tuniform float dx;\n\t\tuniform float dy;\n\n\t\tvoid main(void) {\n\t\t\tfloat uvx = vTextureCoord.x + dx;\n\t\t\tfloat uvy = vTextureCoord.y + dy;\n\n\t\t\tuvx = fract(uvx/" + dw + ");\n\t\t\tuvy = fract(uvy/" + dh + ");\n\n\t\t\tif(uvx > 1.0)\n\t\t\t{\n\t\t\t\tuvx -= 1.0;\n\t\t\t}else if(uvx < 0.0)\n\t\t\t{\n\t\t\t\tuvx += 1.0;\n\t\t\t}\n\n\t\t\tif(uvy > 1.0)\n\t\t\t{\n\t\t\t\tuvy -= 1.0;\n\t\t\t}else if(uvx < 0.0)\n\t\t\t{\n\t\t\t\tuvy += 1.0;\n\t\t\t}\n\n\t\t\tvec2 vCoord = vec2(uvx,uvy);\n\n\t\t\tvec4 fg = texture2D(uSampler, vCoord);\n\t\t\tgl_FragColor = fg;\n\t\t}\n\t\t";
        var shader = new egret.CustomFilter(vs, fs, {
            dx: 0,
            dy: 0
        });
        _this._shader = shader;
        _this.filters = [shader];
        _this.dx = 0;
        _this.dy = 0;
        return _this;
    }
    ScrollTile.prototype.scroll = function (dx, dy) {
        this.dx += dx;
        this.dx %= this._maxSize;
        this.dy += dy;
        this.dy %= this._maxSize;
        this._shader.uniforms.dx = this.dx / this.width;
        this._shader.uniforms.dy = this.dy / this.height;
    };
    return ScrollTile;
}(egret.Bitmap));
__reflect(ScrollTile.prototype, "ScrollTile");
//# sourceMappingURL=ScrollTile.js.map