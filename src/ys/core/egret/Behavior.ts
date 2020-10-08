namespace ys {
    export class Behavior extends egret.EventDispatcher {
        constructor() {
            super();
        }

        Bind(v: egret.DisplayObject, data?: any) {
            this._target = v;
            this.OnStart(data);
            v.once(egret.Event.REMOVED_FROM_STAGE, this.OnStop, this);
        }

        private _target: egret.DisplayObject;
        public get target() {
            return this._target;
        }

        OnStart(data: any) {

        }

        OnStop() {

        }

    }
}