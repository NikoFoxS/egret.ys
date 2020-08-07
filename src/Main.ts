/**
 * 配置项
 */
var cfg = new ys.Config();
cfg.groups = ['preload'];//配置加载资源组
cfg.resourceJSON = 'resource/default.res.json';//配置default.res.json的路径
cfg.resourceRoot = 'resource/';//配置资源的路径
cfg.release = false; // 如果未true，会自动屏蔽掉console.log
cfg.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
cfg.orientation = egret.OrientationMode.PORTRAIT;
cfg.width = 750;
cfg.height = 1334; // iphone6=750x1334 iphoneX=750x1624
cfg.services = [
    { k: "user", v: UserService }
]; //添加数据代理
cfg.buckets = [
    { k: 'user', v: UserBucket }
] //添加通知指令
cfg.mock = false;
//对加载项进行处理
cfg.versionFun = (url) => {
    console.log('加载' + url);
    return url;
}
//处理多语言。
ys.Label.getLocale = (key) => {
    const val = key;
    console.log('多语言', key, '>', val);
    return val;
}

/**
 * 主入口
 */
class Main extends Application {

    public constructor() {
        super(cfg);
    }

    onGroupStart(name: string): void {
        console.log(name, 'start')
    }
    onGroupProgress(loaded: number, total: number, resItem: RES.ResourceInfo | undefined): void {
        console.log(loaded, total, resItem)
    }
    onGroupLoaded(name: string): void {
        if (name == 'preload' || name == '') {
            GG.showPage(TestPage);
        }
    }
}
