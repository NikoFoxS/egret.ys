var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    /**用着色器进行渲染 */
    var PlaneShader = (function () {
        function PlaneShader() {
            /**
             * p1 - p2
             *  |   |
             * p3 - p4
             */
            var vs = "\n\t\tattribute vec2 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\t\tattribute vec4 aColor;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tuniform vec4 p1;\n\t\tuniform vec4 p2;\n\t\tuniform vec4 p3;\n\t\tuniform vec4 p4;\n\t\tvoid main(void) {\n\t\t\tvec2 pos = aVertexPosition;\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvColor = aColor;\n\t\t\tvec4 position;\n\t\t\tif(vTextureCoord.x < 0.5)\n\t\t\tvTextureCoord.y < 0.5 ? (position = p1):(position = p3);\n\t\t\telse\n\t\t\tvTextureCoord.y < 0.5 ?(position = p2):(position = p4);\n\t\t\tgl_Position = position;\n\t\t}\n\t\t";
            var fs = "\n\t\tprecision lowp float;\n\t\tvarying vec2 vTextureCoord;\n\t\tuniform sampler2D uSampler;\n\t\tuniform vec3 color; \n\t\tvarying vec4 vColor;\n\n\t\tvoid main(void) {\n\t\t\tvec4 fg = texture2D(uSampler, vTextureCoord);\n\t\t\tgl_FragColor =fg;\n\t\t}\n\t\t";
            var shader = new egret.CustomFilter(vs, fs, {
                p1: { x: -0.5, y: 0.5, z: 0, w: 1 },
                p2: { x: 0.5, y: 0.5, z: 0, w: 1 },
                p3: { x: -0.5, y: -0.5, z: 0, w: 1 },
                p4: { x: 0.5, y: -0.5, z: 0, w: 1 }
            });
            this._shader = shader;
        }
        Object.defineProperty(PlaneShader.prototype, "shader", {
            get: function () {
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        PlaneShader.prototype.updateArr = function (arr) {
            var p1 = arr[0];
            var p2 = arr[1];
            var p3 = arr[2];
            var p4 = arr[3];
            this.shader.uniforms.p1 = { x: p1.x, y: p1.y, z: p1.z, w: p1.w };
            this.shader.uniforms.p2 = { x: p2.x, y: p2.y, z: p2.z, w: p2.w };
            this.shader.uniforms.p3 = { x: p3.x, y: p3.y, z: p3.z, w: p3.w };
            this.shader.uniforms.p4 = { x: p4.x, y: p4.y, z: p4.z, w: p4.w };
        };
        return PlaneShader;
    }());
    ys3d.PlaneShader = PlaneShader;
    __reflect(PlaneShader.prototype, "ys3d.PlaneShader");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=PlaneShader.js.map