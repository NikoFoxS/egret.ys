class TestPage extends ys.Page {
	public constructor() {
		super();
	}
	public bg: egret.Shape;
	public btn: egret.Shape;

	protected uiCreate(): void {
		console.log("????")
		// this.bg = GG.newRect(stageW, stageH, 0xff00ff, this);
		this.btn = GG.newRect(200, 80, 0xffff00, this);

		const render = new ys3d.Render();
		const cam = new ys3d.Camera(70, stageW / stageH, 1, 10000);
		cam.lookAt(0, 0, -1);

		const scene = new ys3d.Scene(stageW, stageH);
		this.addChild(scene.display);
		const faces = [];
		let i = 6;
		while (i--) {
			faces.push(GG.newBitmap('headimg_jpg'));
		}
		const box = new ys3d.BoxNode(faces);
		box.position.z = - 2000;
		box.position.y = -500;
		scene.addChild(box);

		const pl = new ys3d.PlaneNode(GG.newBitmap('headimg_jpg'));
		pl.position.z = -2000;
		pl.position.y = 500;
		scene.addChild(pl);

		this.addEventListener(egret.Event.ENTER_FRAME, () => {
			box.rotation.y += 1;
			box.rotation.z += 1;
			pl.rotation.y += 1;
			pl.rotation.z += 1;
			render.render(scene, cam);
		}, this);
	}

	protected uiLayout(): void {
		GG.layoutMiddleX(this.btn);
		GG.layoutBottom(this.btn, 100);
	}

	protected onAdded() {

	}

	protected onRemove() {

	}
}

class TestPageMediator extends ys.Mediator {
	constructor(view: ys.View) {
		super(view)
	}

	protected addLogic() {
		//添加界面逻辑
		//通过sendNotice发送通知
		//通过getProxy获取数据
		//通过listenNotice侦听感兴趣的通知
		//通过onNotice处理感兴趣的通知
	}

	protected listenNotice() {
		return [];
	}

	protected onNotice(no: ys.Notice) {

	}
}