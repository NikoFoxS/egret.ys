namespace ys {
    export class View extends egret.DisplayObjectContainer implements RES.PromiseTaskReporter {
        /** 
         * autoRemoveMediator:是否自动移除安装的mediator 
         * autoRemove_ADDED_REMOVED:是否自动移除ADDED_TO_STAGE和REMOVED_FROM_STAGE侦听
         * */
        constructor(resGroup = '', autoRemoveMediator = true, autoRemove_ADDED_REMOVED = true) {
            super();
            this.mediator = [];
            this.arl = autoRemove_ADDED_REMOVED;
            this.arm = autoRemoveMediator;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);

            if (resGroup != '') {
                if (RES.isGroupLoaded(resGroup)) {
                    this.OnStart();
                } else {
                    (async () => {
                        await RES.loadGroup(resGroup, 999, this);
                        this.OnStart();
                    })();
                }
            } else {
                this.OnStart();
            }
        }
        private arl: boolean;
        private arm: boolean;
        set autoRemoveMediator(b) {
            this.arm = b;
        }
        set autoRemoveListener(b) {
            this.arl = b;
        }
        private mediator: ys.mvc.Mediator[];
        /**安装mediator */
        protected addMediator(mediatorClass: any) {
            let m = ys.mvc.Facade.GET.installMediator(this, mediatorClass);
            if (m) {
                this.mediator.push(m);
            }
        }
        /**卸载所有mediator */
        protected removeMediators() {
            this.mediator.forEach(m => {
                ys.mvc.Facade.GET.uninstallMediator(m);
            })
        }

        private _onAdd() {
            // this.OnAdd();
        }

        private _onRemove() {
            if (this.arl) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
                this.release();
            }
            if (this.arm) {
                this.removeMediators();
            }
            // this.OnRemove();
        }
        /**释放资源到对象池 */
        release() {
            let i = this.numChildren;
            while (i--) {
                let c = this.getChildAt(i);
                if (c instanceof ys.Bitmap) {
                    ys.Bitmap.release(c);
                } else if (c instanceof ys.TextField) {
                    ys.TextField.release(c);
                } else if (c instanceof ys.Container) {
                    ys.Container.release(c);
                } else if (c instanceof ys.Shape) {
                    ys.Shape.release(c);
                }
            }
        }

        protected create(ui: ys.View, callback: Function, ref: any) {
            setTimeout(function () {
                //遍历可枚举的属性
                Object.getOwnPropertyNames(ui).forEach(val => {
                    //当前实例的属性
                    // console.log(ui, val, ui.hasOwnProperty(val));
                    if (ui.hasOwnProperty(val)) {
                       
                        if (val.indexOf('bm_') == 0) {
                            const res = val.replace('bm_', '');
                            const bm = ys.Bitmap.create(res);
                            ui.addChild(bm);
                            ui[val] = bm;
                             console.log('创建',val,bm);
                        } else if (val.indexOf('txt_') == 0) {
                            const txt = ys.TextField.create();
                            ui.addChild(txt);
                            ui[val] = txt;
                            console.log('创建TextField',val,txt);
                        } else if (val.indexOf('shape_') == 0) {
                            const s = ys.Shape.create();
                            ui.addChild(s);
                            ui[val] = s;
                            console.log('创建Shape',val,s);
                        } else if (val.indexOf('con_') == 0) {
                            const con = ys.Container.create();
                            ui.addChild(con);
                            ui[val] = con;
                            console.log('创建Container',val,con);
                        }
                    }
                });

                callback.call(ref);
            }, 1);

        }

        public cache: boolean;
        onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
            ys.logger_log(current, total);
        }

        OnStart() {

        }

    }
}