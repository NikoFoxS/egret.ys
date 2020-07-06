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
var UItest = (function (_super) {
    __extends(UItest, _super);
    function UItest() {
        var _this = _super.call(this) || this;
        var rec = GG.newRect(stageW, stageH, 0x000000, _this);
        var la = new ys.Label();
        la.text = '常用组件示例';
        la.size = 30;
        la.width = stageW;
        la.height = 60;
        la.textAlign = 'center';
        la.textColor = 0x000000;
        la.background = true;
        _this.addChild(la);
        la.y = 100;
        var input = new ys.TextInput(200, 40);
        _this.addChild(input);
        input.x = 50;
        input.y = 200;
        input.text = '';
        input.placeholder = '请输入姓名';
        var label = new ys.Label();
        label.html = '<font color=0xffffff size=30 strokecolor=0xff0000 stroke=2>HTMl标签字</font>';
        _this.addChild(label);
        label.x = 300;
        label.y = 200;
        var progress = new ys.ProgressBar('progress-bg_png', 'progress-bar_png');
        _this.addChild(progress);
        progress.x = 50;
        progress.y = 300;
        progress.progress = 0.;
        egret.Tween.get(progress, { loop: true }).to({ progress: 1.0 }, 2000);
        var music = new ys.ButtonMusic('music-on_png', 'music-off_png');
        _this.addChild(music);
        music.enable();
        music.x = 50;
        music.y = 400;
        music.autoPlayMusic('bg_mp3');
        var btnBm = new ys.Button('btn-gray_png');
        // btnBm.setSize(300);
        btnBm.x = 200;
        btnBm.y = 400;
        btnBm.touchEnabled = true;
        btnBm.setLabel('无点击效果无点击', 25, 0xffffff, 100, 0, -5);
        _this.addChild(btnBm);
        btnBm.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GG.showModal('点击了按钮！');
        }, _this);
        var effect = new ys.Button('btn-gray_png');
        effect.x = 500;
        effect.y = 400;
        effect.touchEnabled = true;
        effect.effect = new TouchEffect();
        effect.setLabel('有点击效果', 25, 0xffffff);
        _this.addChild(effect);
        var t = new ys.Label();
        t.width = 300;
        t.height = 700;
        t.text = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试';
        t.lineSpacing = 30;
        t.background = true;
        t.backgroundColor = 0xcccccc;
        var vs = new ys.VScrollBar();
        vs.setContent(t, 300, 500);
        vs.enableBar(0xff0000, 6);
        _this.addChild(vs);
        vs.x = 50;
        vs.y = 550;
        var list = new ys.List(300, 500);
        var i = 50;
        while (i--) {
            var item = new MyItem();
            list.addItem(item);
        }
        list.updateBar();
        _this.addChild(list);
        list.x = 400;
        list.y = 550;
        list.addEventListener(ys.List.ITEM_SELECTED, function (e) {
            var item = e.data;
            console.log(item.index);
        }, _this);
        var img = new ys.Image();
        img.src = 'resource/cha.png';
        _this.addChild(img);
        img.x = 50;
        img.y = 1100;
        img.width = 120;
        img.height = 120;
        return _this;
    }
    return UItest;
}(egret.DisplayObjectContainer));
__reflect(UItest.prototype, "UItest");
var MyItem = (function (_super) {
    __extends(MyItem, _super);
    function MyItem() {
        return _super.call(this, null) || this;
    }
    MyItem.prototype.onCreate = function () {
        this.rec = GG.newRect(300, GG.randomInt(80, 120), GG.randomInt(0, 0xffffff), this);
    };
    Object.defineProperty(MyItem.prototype, "itemH", {
        get: function () {
            return this.rec.height;
        },
        enumerable: true,
        configurable: true
    });
    MyItem.prototype.render = function () {
    };
    return MyItem;
}(ys.ListItem));
__reflect(MyItem.prototype, "MyItem");
var TouchEffect = (function () {
    function TouchEffect() {
    }
    TouchEffect.prototype.onTouchBeginEffect = function (btn) {
        btn.filters = [new egret.GlowFilter(0xff0000, 1, 5, 5)];
    };
    TouchEffect.prototype.onTouchEndEffect = function (btn) {
        btn.filters = [];
    };
    return TouchEffect;
}());
__reflect(TouchEffect.prototype, "TouchEffect", ["ys.ButtonTouchEffect"]);
//# sourceMappingURL=UItest.js.map