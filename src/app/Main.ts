class Main extends ys.Application {

    public constructor() {
        /** 配置项 */
        var cfg = new ys.Config();
        cfg.groups = ['preload',];//配置加载资源组
        cfg.resourceJSON = 'resource/default.res.json';//配置default.res.json的路径
        cfg.resourceRoot = 'resource/';//配置资源的路径
        cfg.log = true; //开启console.log
        // cfg.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
        cfg.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        cfg.orientation = egret.OrientationMode.PORTRAIT;
        cfg.width = 750;
        cfg.height = 1000;
        //对加载项进行处理
        cfg.versionFun = (url) => {
            console.log('loading ' + url);
            //特殊处理加载
            return url;
        }
        //一般处理多语言。
        // ys.TextField.getLocale = (key) => {
        //     const val = key;
        //     return val;
        // }

        super();

        ys.Model.set('token',"UYHIHUHGUIG123131dsfH");

        ys.Ajax.mock = (url: string, data: any) => {
            let res;
            switch (url) {
                case "https://www.baidu.com/home/xman/data/tipspluslist":
                    res = { code: 0, data: { name: "name", score: 1234,headimageurl:"resource/home/paiping.png" } }
                    break;
            }
            return res;
        }

        //开发者可以在run之前，进行相应逻辑的判断。判断成功才进行run。
        this.once(egret.Event.ADDED_TO_STAGE, () => {
            this.run(cfg);
        }, this);

    }


    OnLoadStart(name: string) {

    }

    OnLoadProgress(current: number, total: number) {
        console.log(current, '/', total)
        if (this.loading) {
            this.loading.progress(current, total);
        }
    }

    private loading: LoadingUI;
    OnLoadEnd(name: string) {
        switch (name) {
            case 'loading':
                this.loading = new LoadingUI();
                this.addChild(this.loading);
                break;

            case 'preload':
                if (this.loading) {
                    ys.removeDisplayObject(this.loading);
                }

                // ys.showView(RES.getRes('home_json'));
                ys.loadView('resource/home.json')

                break;

            case 'sharein':
                break;
        }
    }

}

