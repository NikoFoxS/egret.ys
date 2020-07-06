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
//界面布局和样式
var app;
(function (app) {
    //以下内容不会被覆盖
    var TestView = (function (_super) {
        __extends(TestView, _super);
        function TestView() {
            var _this = _super.call(this, app.TestViewMediator) || this;
            _this.name = 'TestView';
            console.log('创建页面', _this.name);
            return _this;
        }
        TestView.prototype.uiCreate = function () {
            _super.prototype.uiCreate.call(this);
            GG.newRect(stageW, stageH, 0xffffff, this);
            var scene = new ys3d.Scene(stageW, stageH);
            this.addChild(scene.display);
            this.scene = scene;
            var cam = new ys3d.Camera(55, stageW / stageH, 1, 10000);
            //
            var rec = GG.newRect(200, 200, Math.random() * 0xff0000);
            function createBox(arr) {
                var box = new ys3d.BoxNode(arr); //new ys3d.Group();
                box.name = 'BoxNode';
                scene.addChild(box);
                return box;
            }
            var k = 6;
            var arr = [];
            while (k--) {
                var bm = GG.newBitmap('headimg_jpg');
                bm.width = 200;
                bm.height = 200;
                arr.push(bm);
            }
            var box = createBox(arr);
            scene.addChild(box);
            egret.Tween.get(box.rotation, { loop: true }).to({ y: 360 }, 6000);
            egret.Tween.get(box.rotation, { loop: true }).to({ x: 360 }, 6000);
            box.position.z = -cam.far * 0.9;
            var createTree = function (x, y, z, p) {
                if (p === void 0) { p = true; }
                if (p) {
                    var tree = new ys3d.PlaneNode(GG.newBitmap('tree_png'));
                }
                else {
                    var tree = new ys3d.SpriteNode(RES.getRes('tree_png'), 0.5, 1);
                }
                tree.position.y = y;
                tree.position.x = x;
                tree.position.z = z;
                scene.addChild(tree);
                return tree;
            };
            var jj = 50;
            while (jj--) {
                var ang = Math.random() * Math.PI * 2;
                var r = GG.randomInt(100, 1000);
                createTree(Math.cos(ang) * r, -200 - 293 * 0.5, -2000 - jj * 400, true);
            }
            cam.lookAt(0, 0, -1);
            var render = new ys3d.Render();
            render.render(scene, cam);
            this.addEventListener(egret.Event.ENTER_FRAME, function () {
                cam.position.z -= 30;
                scene.children.forEach(function (tree) {
                    if (tree.position.z > cam.position.z) {
                        tree.position.z -= cam.far;
                    }
                });
                render.render(scene, cam);
            }, this);
        };
        TestView.prototype.uiLayout = function () {
            _super.prototype.uiLayout.call(this);
            this.scene.display.x = stageHalfW;
            this.scene.display.y = stageHalfH;
            console.log('resize?', stageW, stageH);
        };
        return TestView;
    }(ys.View));
    app.TestView = TestView;
    __reflect(TestView.prototype, "app.TestView");
})(app || (app = {}));
//# sourceMappingURL=TestView.js.map