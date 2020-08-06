namespace ys {
    export class UI extends egret.DisplayObjectContainer {
        /** 
         * autoRemoveMediator:是否自动移除安装的mediator 
         * autoRemoveListener:是否自动移除ADDED_TO_STAGE和REMOVED_FROM_STAGE侦听
         * */
        constructor(autoRemoveMediator = true, autoRemoveListener = true) {
            super();
            this.mediatorName = [];
            this.arl = autoRemoveListener;
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
        private mediatorName: string[];
        /**安装mediator */
        protected addMediator(name, mediatorClass: any) {
            let m = ys.mvc.Facade.GET.installMediator(name, mediatorClass);
            if(m)
            {
                m.bind(this);
                m.Install();
                this.mediatorName.push(name);
            }
        }
        /**卸载所有mediator */
        protected removeMediators() {
            this.mediatorName.forEach(name => {
                ys.mvc.Facade.GET.uninstallMediator(name);
            })
        }

        private _onAdd() {
            this.onAdd();
        }

        private _onRemove() {
            if (this.arl) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
            }
            if (this.arm) {
                this.removeMediators();
            }
            this.onRemove();
        }

        onAdd() {

        }

        onRemove() {

        }

    }
}