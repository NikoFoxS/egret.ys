//界面布局和样式
module app {
    //以下内容不会被覆盖
    export class TestView extends ys.View {
        public constructor() {
            super(TestViewMediator);
            this.name = 'TestView';
            console.log('创建页面', this.name);
        }

        protected uiCreate(): void {
            super.uiCreate();

            GG.newRect(stageW, stageH, 0xffffff, this);

            const scene = new ys3d.Scene(stageW, stageH);
            this.addChild(scene.display);
            this.scene = scene;

            const cam = new ys3d.Camera(55, stageW / stageH, 1, 10000);
            //
            var rec = GG.newRect(200, 200, Math.random() * 0xff0000);

            function createBox(arr) {
                var box = new ys3d.BoxNode(arr);//new ys3d.Group();
                box.name = 'BoxNode';
                scene.addChild(box);
                return box;
            }

            var k = 6;
            var arr = [];
            while (k--) {

                var bm = GG.newBitmap('headimg_jpg')
                bm.width = 200;
                bm.height = 200;
                arr.push(bm);
            }

            var box = createBox(arr);
            scene.addChild(box);
            egret.Tween.get(box.rotation, { loop: true }).to({ y: 360 }, 6000);
            egret.Tween.get(box.rotation, { loop: true }).to({ x: 360 }, 6000);
            box.position.z = - cam.far*0.9;


            var createTree = (x, y, z, p = true) => {
                if (p) {
                    var tree: any = new ys3d.PlaneNode(GG.newBitmap('tree_png'));
                } else {
                    var tree: any = new ys3d.SpriteNode(RES.getRes('tree_png'), 0.5, 1);
                }

                tree.position.y = y;
                tree.position.x = x
                tree.position.z = z;
                scene.addChild(tree);
                return tree;
            }

            let jj = 50;
            while (jj--) {
                const ang = Math.random() * Math.PI * 2;
                const r = GG.randomInt(100, 1000);
                createTree(Math.cos(ang) * r, -200 - 293 * 0.5, -2000 - jj * 400, true);

            }

            cam.lookAt(0, 0, -1);

            const render = new ys3d.Render();

            render.render(scene, cam);

            this.addEventListener(egret.Event.ENTER_FRAME, () => {
                cam.position.z -= 30;
                scene.children.forEach(tree => {
                    if (tree.position.z > cam.position.z) {
                        tree.position.z -= cam.far;
                    }
                })
                render.render(scene, cam);
            }, this);


        }

        private scene: ys3d.Scene;

        protected uiLayout(): void {
            super.uiLayout();
            this.scene.display.x = stageHalfW;
            this.scene.display.y = stageHalfH;
            console.log('resize?', stageW, stageH)
        }
    }

}