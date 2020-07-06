class UItest extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		let rec = GG.newRect(stageW, stageH, 0x000000, this);


		let la = new ys.Label();
		la.text = '常用组件示例';
		la.size = 30;
		la.width = stageW;
		la.height = 60;
		la.textAlign = 'center';
		la.textColor = 0x000000;
		la.background = true;
		this.addChild(la);
		la.y = 100;

		let input = new ys.TextInput(200, 40);
		this.addChild(input);
		input.x = 50;
		input.y = 200;
		input.text = ''
		input.placeholder = '请输入姓名'

		let label = new ys.Label();
		label.html = '<font color=0xffffff size=30 strokecolor=0xff0000 stroke=2>HTMl标签字</font>';
		this.addChild(label);
		label.x = 300;
		label.y = 200;

		let progress = new ys.ProgressBar('progress-bg_png', 'progress-bar_png');
		this.addChild(progress);
		progress.x = 50;
		progress.y = 300;
		progress.progress = 0.;
		egret.Tween.get(progress, { loop: true }).to({ progress: 1.0 }, 2000);

		let music = new ys.ButtonMusic('music-on_png', 'music-off_png');
		this.addChild(music);
		music.enable();
		music.x = 50;
		music.y = 400;
		music.autoPlayMusic('bg_mp3');

		let btnBm = new ys.Button('btn-gray_png');
		// btnBm.setSize(300);
		btnBm.x = 200;
		btnBm.y = 400;
		btnBm.touchEnabled = true;
		btnBm.setLabel('无点击效果无点击', 25, 0xffffff, 100, 0, -5);
		this.addChild(btnBm);
		btnBm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GG.showModal('点击了按钮！');
		 }, this);

		let effect = new ys.Button('btn-gray_png');
		effect.x = 500;
		effect.y = 400;
		effect.touchEnabled = true;
		effect.effect = new TouchEffect();
		effect.setLabel('有点击效果', 25, 0xffffff);
		this.addChild(effect);


		let t = new ys.Label();
		t.width = 300;
		t.height = 700;

		t.text = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试';
		t.lineSpacing = 30;
		t.background = true;
		t.backgroundColor = 0xcccccc;
		let vs = new ys.VScrollBar();
		vs.setContent(t, 300, 500);
		vs.enableBar(0xff0000, 6);
		this.addChild(vs);
		vs.x = 50;
		vs.y = 550;


		let list = new ys.List(300, 500);
		let i = 50;
		while (i--) {
			let item = new MyItem();
			list.addItem(item);
		}
		list.updateBar();
		this.addChild(list);
		list.x = 400;
		list.y = 550;
		list.addEventListener(ys.List.ITEM_SELECTED, (e: egret.Event) => {
			let item = e.data;
			console.log(item.index)
		}, this);

		let img = new ys.Image();
		img.src = 'resource/cha.png';
		this.addChild(img);
		img.x = 50;
		img.y = 1100;
		img.width = 120;
		img.height = 120;
	}
}

class MyItem extends ys.ListItem {
	constructor() {
		super(null);
	}

	private rec: egret.Shape;
	protected onCreate() {
		this.rec = GG.newRect(300, GG.randomInt(80, 120), GG.randomInt(0, 0xffffff), this);
	}

	public get itemH() {
		return this.rec.height;
	}

	public render() {

	}
}

class TouchEffect implements ys.ButtonTouchEffect {
	onTouchBeginEffect(btn: ys.Button) {
		btn.filters = [new egret.GlowFilter(0xff0000, 1, 5, 5)];
	}

	onTouchEndEffect(btn: ys.Button) {
		btn.filters = [];
	}
}