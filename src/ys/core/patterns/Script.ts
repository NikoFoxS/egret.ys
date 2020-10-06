namespace ys {

    export class Script implements ys.IUnit {
        constructor() {
        }

        Bind(v: any,data?:any) {
            this._v = v;
            this.OnRegister(data);
        }
        Unbind() {
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
    }

}