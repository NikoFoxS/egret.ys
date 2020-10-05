class LoaderScript extends ys.Script {
    public constructor() {
        super();
    }

    Install(): void {

    }
    Uninstall(): void {
    }
    /**列出需要关注的invoke */
    ListInvoke(): any[] {
        return ['start_load_groups'];
    }
    /**处理 invoke*/
    OnInvoke(handler: number | string, data: any): void {
        console.log('invoke', handler)
        if (handler == 'start_load_groups') {
            (async () => {
                const groups: string[] = data;
                const ui = this.GetView<ys.UI>();
                var i = 0;
                var len = groups.length;
                if (len) {
                    while (i < len) {
                        await this.loadGroup(groups[i]);
                        i++;
                    }
                    ui.Start();
                } else {
                    ui.Start();
                }
            })();
        }
    }

    async loadGroup(name) {
        let ui = this.GetView();
        let loader = ui as ys.LoadingReporter;
        try {
            if (RES.isGroupLoaded(name)) {
                loader.OnLoadEnd(name);
            } else {
                loader.OnLoadStart(name);
                await RES.loadGroup(name, 9999, ui as RES.PromiseTaskReporter);
                loader.OnLoadEnd(name);
            }

        } catch (e) {
            console.warn('加载异常！');
        }
    }


}