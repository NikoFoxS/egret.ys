namespace ys {
    export class Script extends Invoker implements IUnit, IInvoked {
        constructor() {
            super();
        }

        bind(v: any) {
            this._v = v;
        }
        unbind() {
            this._v = null;
        }
        private _v: any;
        GetView<T>(): T {
            return this._v;
        }
        //---------------------------------
        //以下方法需要被重写
        //---------------------------------
        Install(param?:any): void {
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