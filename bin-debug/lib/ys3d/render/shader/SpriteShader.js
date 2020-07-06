var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    var SpriteShader = (function () {
        function SpriteShader() {
            var vs = "\n\t\tattribute vec2 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\t\tattribute vec4 aColor;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tuniform vec2 projectionVector;\n\t\tconst vec2 center = vec2(-1.0, 1.0);\n\t\tuniform vec4 v4;\n\t\n\t\tvoid main(void) {\n\t\t\tvec2 pos = aVertexPosition;\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvColor = aColor;\n\t\t\tvec4 position = vec4( (aVertexPosition / projectionVector) + center , 0.0, v4.w);\n\t\t\tposition.x += v4.x;\n\t\t\tposition.y += v4.y;\n\t\t\tgl_Position = position;\n\t\t}\n\t\t";
            var fs = "\n\t\tprecision lowp float;\n\t\tvarying vec2 vTextureCoord;\n\t\tuniform sampler2D uSampler;\n\t\tuniform vec3 color; \n\t\tvarying vec4 vColor;\n\n\t\tvoid main(void) {\n\t\t\tvec4 fg = texture2D(uSampler, vTextureCoord);\n\t\t\tgl_FragColor =fg;\n\t\t}\n\t\t";
            var shader = new egret.CustomFilter(vs, fs, {
                w: 1.0
            });
            this._shader = shader;
        }
        Object.defineProperty(SpriteShader.prototype, "shader", {
            get: function () {
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        SpriteShader.prototype.update = function (v4) {
            this.shader.uniforms.v4 = { x: v4.x, y: v4.y, z: v4.z, w: v4.w };
        };
        return SpriteShader;
    }());
    ys3d.SpriteShader = SpriteShader;
    __reflect(SpriteShader.prototype, "ys3d.SpriteShader");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=SpriteShader.js.map