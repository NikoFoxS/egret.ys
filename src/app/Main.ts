class Main extends ys.Application {

    public constructor() {
        /** 配置项 */
        var cfg = new ys.Config();
        cfg.groups = ['preload'];//配置加载资源组
        cfg.resourceJSON = 'resource/default.res.json';//配置default.res.json的路径
        cfg.resourceRoot = 'resource/';//配置资源的路径
        cfg.log = true; //开启console.log
        cfg.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
        cfg.orientation = egret.OrientationMode.PORTRAIT;
        cfg.width = 750;
        cfg.height = 1334;
        //添加服务Service
        cfg.services = [
            [SERVICE.USER_INFO, service.UserInfo],
        ];
        //添加数据Bucket
        cfg.buckets = [
            [BUCKET.USER_INFO, bucket.UserInfo]
        ]
        cfg.mock = false;
        //对加载项进行处理
        cfg.versionFun = (url) => {
            console.log('加载' + url);
            return url;
        }
        //一般处理多语言。
        ys.TextField.getLocale = (key) => {
            const val = key;
            return val;
        }

        super();
        //开发者可以在run之前，进行相应逻辑的判断。判断成功才进行run。
        this.once(egret.Event.ADDED_TO_STAGE, () => {
            this.run(cfg);
        }, this);

    }


    OnLoadStart(name: string) {

    }

    OnLoadProgress(current: number, total: number) {
        console.log(current, '/', total)
    }

    OnLoadEnd(name: string) {

    }

    Start() {
        ys.showPage(page.Open);
    }
}

