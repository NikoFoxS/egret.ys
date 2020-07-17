/**
 * 配置项
 */
var cfg = new Config();
cfg.groups = ['preload'];//配置加载资源组
cfg.resourceJSON = 'resource/default.res.json';//配置default.res.json的路径
cfg.resourceRoot = 'resource/';//配置资源的路径
cfg.release = false; // 如果未true，会自动屏蔽掉console.log
cfg.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
cfg.orientation = egret.OrientationMode.PORTRAIT;
cfg.width = 750;
cfg.height = 1334; // iphone6=750x1334 iphoneX=750x1624
cfg.proxy = []; //添加数据代理
cfg.command = [] //添加通知指令
cfg.mock = false;
//对加载项进行处理
cfg.versionFun = (url) => {
    console.log('加载'+ url);
   
    if (url.indexOf('.json') == -1) {
        url = 'https://p.h5sun.com/tbgame/' + url;
    }

     tb.log('加载',url)

    return url;
}
//处理多语言。
ys.Label.getLocale = (key) => {
    const val = key;
    console.log('多语言', key, '>', val);
    return val;
}

// console.log('??',location.href);

//加载报告，只负责报告。显示需要另外处理。
class MyLoadingReporter extends ys.LoadingReporter {
    public constructor() {
        super();
    }

    private view: LoadingUI;
    public onReady(): void {
        //
        this.view = new LoadingUI();
        stage.addChild(this.view);
    }

    public onStart(groupName: string): void {
        console.log(groupName, 'start')
    }

    public onProgress(current: number, total: number, resItem: RES.ResourceInfo) {
        // console.log(current, total, resItem)
        this.view.onProgress(current, total);
    }

    public onLoaded(groupName): void {
        this.view.onLoaded(groupName);
        console.log('groupName::', groupName)
        if (groupName == 'preload' || groupName == '') {
            GG.removeDisplayObject(this.view);
            // let start = new app.TestView();
            // main.addChild(start);
            GG.showPage(TestPage);
        }
    }

}

/**
 * 主入口
 */
class Main extends Application {

    public constructor() {
        super(cfg, new MyLoadingReporter);
    }
}