namespace ys {

    export class Script implements ys.IUnit, ys.IObserver {
        constructor() {
            this._className = egret.getQualifiedClassName(this);
            this.invoker = new ys.Invoker();
        }
        private _className:string;
		public get className()
		{
			return this._className;
		};
        protected invoker: ys.Invoker;

        Bind(v: any,data?:any) {
            this._v = v;
            ys.Facade.GET.view.RegisterScript(this);
            this.OnRegister(data);
        }
        Unbind() {
            ys.Facade.GET.view.removeScript(this);
            this.OnRemove();
            this._v = null;
        }
        private _v: any;
        get target(): any {
            return this._v;
        }

        //-----

        OnRegister(data?:any) {

        }

        OnRemove() {

        }

        ListInvoke(): any[] {
			return [];
		}

		OnInvoke(handler: number, data?: any): void {

		}
    }

}