namespace ys {
    export class Script extends Invoker implements IUnit, IInvoked {
        constructor() {
            super();
        }

        bind(v: any) {
            this._v = v;
            ys.Facade.GET.addScript(this);
        }
        unbind() {
            this._v = null;
            ys.Facade.GET.removeScript(this);
        }

        private _v: any;
        GetView<T>(): T {
            return this._v;
        }

        // AddScript(display: egret.DisplayObject, ScriptClass, param?) {
        //     const sc = new ScriptClass() as ys.Script;
        //     sc.bind(display);
        //     sc.Install(param);
        //     display.once(egret.Event.REMOVED_FROM_STAGE, () => {
        //         sc.unbind();
        //         sc.Uninstall();
        //     }, this)
        // }

        //---------------------------------
        //以下方法需要被重写
        //---------------------------------
        Install(param?: any): void {
            throw new Error('need override Install()')
        }
        Uninstall(): void {
            throw new Error('need override Uninstall()')
        }
        /**列出需要关注的invoke */
        ListInvoke(): any[] {
            return [];
        }
        /**处理 invoke*/
        OnInvoke(handler: number | string, data: any): void {

        }
    }
}