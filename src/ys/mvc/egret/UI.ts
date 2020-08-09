namespace ys {
    export class BindKV {
        display: egret.DisplayObject;
        behavior: ys.Behavior;
    }
    export class UI extends egret.DisplayObjectContainer {
        /** 
         * autoRemoveMediator:是否自动移除安装的mediator 
         * autoRemove_ADDED_REMOVED:是否自动移除ADDED_TO_STAGE和REMOVED_FROM_STAGE侦听
         * */
        constructor(autoRemoveMediator = true, autoRemove_ADDED_REMOVED = true) {
            super();
            this.mediator = [];
            this.behaviorBindPool = [];
            this.arl = autoRemove_ADDED_REMOVED;
            this.arm = autoRemoveMediator;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
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
        private behaviorBindPool: BindKV[];
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
            this.OnAdd();
        }

        private _onRemove() {
            if (this.arl) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
            }
            if (this.arm) {
                this.removeMediators();
            }

            let i = this.behaviorBindPool.length;
            while (i--) {
                let bb = this.behaviorBindPool[i];
                this.behaviorBindPool.splice(i, 1);
                bb.behavior.Uninstall();
                bb.behavior.unbind();
                bb.display = null;
                bb.behavior = null;
                break;
            }
            this.OnRemove();
        }

        unbindBehavior(b: ys.Behavior) {
            let i = this.behaviorBindPool.length;
            while (i--) {
                let bb = this.behaviorBindPool[i];
                if (bb.behavior == b) {
                    this.behaviorBindPool.splice(i, 1);
                    bb.behavior.Uninstall();
                    bb.behavior.unbind();
                    bb.display = null;
                    bb.behavior = null;
                    break;
                }
            }
        }

        bindBehavior(d: egret.DisplayObject, BehaviorClass: any, params: any): ys.Behavior {
            let behavior: ys.Behavior = new BehaviorClass();
            behavior.upateParams(params);
            behavior.bind(d);
            behavior.Install();

            let bind = new BindKV();
            bind.display = d;
            bind.behavior = behavior;
            this.behaviorBindPool.push(bind);

            return behavior;
        }

        OnAdd() {

        }

        OnRemove() {

        }

    }
}