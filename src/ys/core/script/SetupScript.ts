class SetupScript extends ys.Script {
    constructor() {
        super();
    }

    Install(cfg): void {
        // let v = this.GetView<ys.Application>();
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        //设置接口为mock数据
        ys.Ajax.mock = cfg.mock;

        //安装服务
        cfg.services && cfg.services.forEach(([k, v]) => {
            ys.Facade.GET.installService(k, v);
        })
        //安装数据bucket
        cfg.buckets && cfg.buckets.forEach(([k, v]) => {
            ys.Facade.GET.installBucket(k, v);
        })

        ys.setup(cfg);

        RES.registerVersionController(new ys.VersionController(cfg.versionFun));
        (async () => {
            await RES.loadConfig(cfg.resourceJSON, cfg.resourceRoot);//微信小游戏，不能带随机数。
            this.InvokeScript('start_load_groups', cfg.groups);
        })();

    }

    Uninstall(): void {
    }
}