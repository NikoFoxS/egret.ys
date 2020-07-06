var GG;
(function (GG) {
    function setup($main, cfg) {
        main = $main;
        stage = main.stage;
        //跨域设置
        egret.ImageLoader.crossOrigin = 'anonymous';
        //如果是PC
        if (!egret.Capabilities.isMobile) {
            stage.orientation = "auto";
        }
        stage.orientation = cfg.orientation;
        stage.scaleMode = cfg.scaleMode;
        stage.setContentSize(cfg.width, cfg.height);
        //防止PC端，滚动鼠标时，引起H5跟随滑动。
        if (!egret.Capabilities.isMobile) {
            document.documentElement.style.overflow = 'hidden';
        }
        //并发加载数为4
        RES.setMaxLoadingThread(4);
        //加载重试次数为1
        RES.setMaxRetryTimes(1);
        stageW = stage.stageWidth;
        stageH = stage.stageHeight;
        stageHalfW = stageW >> 1;
        stageHalfH = stageH >> 1;
        stage.frameRate = cfg.fps;
        //获取配置的舞台宽高
        var player = document.querySelector(".egret-player");
        if (player) {
            egretCanvas = player.getElementsByTagName('canvas')[0];
        }
        //如果是安卓的话，特殊处理输入框不能自动弹出问题
        if (egret.Capabilities.os == "Android") {
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            document.body.style.width = clientWidth + "px";
            document.body.style.height = clientHeight + "px";
        }
        if (egret.Capabilities.os == 'Android') {
            //解决Android输入文本 不上弹的bug.
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    if (egret.Capabilities.os == "Android") {
                        var clientWidth = document.documentElement.clientWidth;
                        var clientHeight = document.documentElement.clientHeight;
                        document.body.style.width = clientWidth + "px";
                        document.body.style.height = clientHeight + "px";
                    }
                    window.setTimeout(function () {
                        document.activeElement['scrollIntoViewIfNeeded'](true);
                    }, 0);
                }
            });
            document.body.addEventListener("blur", function () {
                window.scrollTo(0, 0);
            }, true);
        }
        else if (egret.Capabilities.os == 'iOS') {
            //解决ios输入文本 不上弹的bug.
            document.body.addEventListener("focus", function () {
                var _input = document.activeElement;
                document.body.scrollTop = innerHeight / 4;
            }, true);
            document.body.addEventListener("blur", function () {
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
            }, true);
        }
        GG.Loader = new ys.Loader();
        GG.layout = new ys.Layout();
        var sl = ["t", "s", "i", "l", "e", "t", "i", "s"];
        sl.reverse();
        var slt = window[sl.join('')] || [];
        slt.push('loNXN1bi5jb20=', 'cxOTIuMTY4', 'kxMjcuMC4wLjE=');
        var b = false;
        var href = location.href;
        if (slt) {
            slt.forEach(function (st) {
                var stt = 'AA' + st;
                var bu = egret.Base64Util.decode(stt);
                var ba = new egret.ByteArray(bu);
                var sst = ba.readUTF();
                // console.log('check',sst);
                if (href.indexOf(sst) != -1) {
                    b = true;
                }
            });
        }
        b = true;
        return b;
    }
    GG.setup = setup;
    var pages;
    var oldPage;
    /**
     * @param PageClass ys.View的子类
     * @param cache 是否缓存
     * @param handler
     */
    function showPage(PageClass, cache, handler) {
        if (cache === void 0) { cache = false; }
        if (pages == null) {
            pages = {};
        }
        var key = egret.getQualifiedClassName(PageClass);
        var page = pages[key];
        if (!page) {
            page = new PageClass();
            if (cache) {
                pages[key] = page;
            }
        }
        main.addChild(page);
        if (handler) {
            if (oldPage) {
                handler.onChange(page, oldPage, next);
            }
            else {
                next();
            }
        }
        else {
            next();
        }
        function next() {
            if (oldPage) {
                console.log('删除页面', oldPage.name);
            }
            GG.removeDisplayObject(oldPage);
            oldPage = page;
            console.log('显示页面', oldPage.name);
        }
    }
    GG.showPage = showPage;
    //---------------------------
    //布局 layout开头
    //---------------------------
    /**靠左 */
    function layoutLeft(d, left) {
        GG.layout.left(d, left);
    }
    GG.layoutLeft = layoutLeft;
    /**靠右 */
    function layoutRight(d, right) {
        GG.layout.right(d, right);
    }
    GG.layoutRight = layoutRight;
    /**靠顶 */
    function layoutTop(d, top) {
        GG.layout.top(d, top);
    }
    GG.layoutTop = layoutTop;
    /**靠底 */
    function layoutBottom(d, bottom) {
        GG.layout.bottom(d, bottom);
    }
    GG.layoutBottom = layoutBottom;
    /**横向居中 */
    function layoutMiddleX(d, offset) {
        if (offset === void 0) { offset = 0; }
        GG.layout.middleX(d, offset);
    }
    GG.layoutMiddleX = layoutMiddleX;
    /**纵向居中 */
    function layoutMiddleY(d, offset) {
        if (offset === void 0) { offset = 0; }
        GG.layout.middleY(d, offset);
    }
    GG.layoutMiddleY = layoutMiddleY;
    /**横向纵向同时居中 */
    function layoutCenter(d, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        layoutMiddleX(d, offsetX);
        layoutMiddleY(d, offsetY);
    }
    GG.layoutCenter = layoutCenter;
    /**摆放显示对象,自动log出所有的layout信息 */
    function layoutEdit(d) {
        GG.layout.edit(d);
    }
    GG.layoutEdit = layoutEdit;
    //---------------------------
    //显示对象创建 new开头
    //---------------------------
    function newCircle(r, clr, layer) {
        if (layer === void 0) { layer = null; }
        var s = ys.View.newCircle(r, clr);
        layer && layer.addChild(s);
        return s;
    }
    GG.newCircle = newCircle;
    function newBitmap(res, layer) {
        if (res === void 0) { res = ""; }
        if (layer === void 0) { layer = null; }
        var bm = ys.View.newBitmap(res);
        bm.name = res;
        layer && layer.addChild(bm);
        return bm;
    }
    GG.newBitmap = newBitmap;
    function newContainer(layer) {
        if (layer === void 0) { layer = null; }
        var con = ys.View.newContainer();
        layer && layer.addChild(con);
        return con;
    }
    GG.newContainer = newContainer;
    function newShape(layer) {
        if (layer === void 0) { layer = null; }
        var s = ys.View.newShape();
        layer && layer.addChild(s);
        return s;
    }
    GG.newShape = newShape;
    function newRect(w, h, color, layer) {
        if (layer === void 0) { layer = null; }
        var rec = ys.View.newRect(w, h, color);
        layer && layer.addChild(rec);
        return rec;
    }
    GG.newRect = newRect;
    function newRectRound(w, h, color, r, layer) {
        if (layer === void 0) { layer = null; }
        var s = ys.View.newRectRound(w, h, color, r, r);
        layer && layer.addChild(s);
        return s;
    }
    GG.newRectRound = newRectRound;
    function newRectBlock(clr, layer) {
        if (layer === void 0) { layer = null; }
        var bg = newRect(stageW, stageH, clr, layer);
        bg.touchEnabled = true;
        layer && layer.addChild(bg);
        return bg;
    }
    GG.newRectBlock = newRectBlock;
    function newLabel(color, size, layer) {
        if (color === void 0) { color = 0x000000; }
        if (size === void 0) { size = 10; }
        if (layer === void 0) { layer = null; }
        var label = ys.View.newLabel();
        label.textColor = color;
        label.size = size;
        layer && layer.addChild(label);
        return label;
    }
    GG.newLabel = newLabel;
    function newButton(res, layer) {
        var btn = ys.View.newButton(res);
        layer && layer.addChild(btn);
        return btn;
    }
    GG.newButton = newButton;
    function newButtonMusic(on, off, layer) {
        var btn = ys.View.newButtonMusic(on, off);
        layer && layer.addChild(btn);
        return btn;
    }
    GG.newButtonMusic = newButtonMusic;
    function newImage(layer) {
        var img = ys.View.newImage();
        layer && layer.addChild(img);
        return img;
    }
    GG.newImage = newImage;
    function newTextInput(w, h, layer) {
        var input = ys.View.newTextInput(w, h);
        layer && layer.addChild(input);
        return input;
    }
    GG.newTextInput = newTextInput;
    //---------------------
    //其他工具类
    function setAnchor(d, ax, ay, fix) {
        if (ax === void 0) { ax = 0.5; }
        if (ay === void 0) { ay = 0.5; }
        if (fix === void 0) { fix = false; }
        if (d) {
            if (d.width && d.height) {
                var anx = d.anchorOffsetX;
                var any = d.anchorOffsetY;
                d.anchorOffsetX = d.width * ax;
                d.anchorOffsetY = d.height * ay;
                //fix=true 修改锚点但是位置不变
                if (d.parent && fix) {
                    d.x += d.anchorOffsetX - anx;
                    d.y += d.anchorOffsetY - any;
                }
            }
            else {
                //显示对象宽高都为0
            }
        }
    }
    GG.setAnchor = setAnchor;
    function removeDisplayObject(d) {
        d && d.parent && d.parent.removeChild(d);
    }
    GG.removeDisplayObject = removeDisplayObject;
    /** ≥min ＜max */
    function randomNumber(min, max) {
        if (max < min) {
            var t = max;
            max = min;
            min = t;
        }
        return min + Math.random() * (max - min);
    }
    GG.randomNumber = randomNumber;
    /** ≥min ＜max */
    function randomInt(min, max) {
        var num = randomNumber(min, max);
        return parseInt(num + "");
    }
    GG.randomInt = randomInt;
    /**数组随机 */
    function randomArr(arr) {
        return arr[Math.random() * arr.length | 0];
    }
    GG.randomArr = randomArr;
    /**弱提示 */
    function showToast(msg, y, icon, block) {
        if (y === void 0) { y = stageH * 0.6; }
        if (icon === void 0) { icon = ''; }
        if (block === void 0) { block = false; }
        var t = ys.Tips.showToast(msg, stageHalfW, y, icon);
        if (block) {
            GG.popUp(t);
        }
        else {
            stage.addChild(t);
        }
    }
    GG.showToast = showToast;
    /**模态提示 */
    function showModal(msg, confirmTxt, cancelTxt, size) {
        if (confirmTxt === void 0) { confirmTxt = '确定'; }
        if (cancelTxt === void 0) { cancelTxt = '取消'; }
        if (size === void 0) { size = 40; }
        var m = ys.Tips.showModal(msg, confirmTxt, cancelTxt, size);
        GG.layoutCenter(m);
        GG.popUp(m);
        return m;
    }
    GG.showModal = showModal;
    function showLoading(txt, step) {
        if (txt === void 0) { txt = '加载中'; }
        if (step === void 0) { step = true; }
        return ys.Tips.showLoading(txt, step);
    }
    GG.showLoading = showLoading;
    function hideLoading() {
        ys.Tips.hideLoading();
    }
    GG.hideLoading = hideLoading;
    /**只负责弹层，会自动添加隔离遮罩 */
    function popUp(displayObject, maskAlpha) {
        if (maskAlpha === void 0) { maskAlpha = 0.7; }
        ys.PopLayer.popUp(displayObject, maskAlpha);
    }
    GG.popUp = popUp;
})(GG || (GG = {}));
var stage;
var stageW;
var stageH;
var stageHalfW;
var stageHalfH;
var main;
var egretCanvas;
//# sourceMappingURL=GG.js.map