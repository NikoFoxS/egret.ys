namespace ys {
    export class Behavior extends egret.EventDispatcher {
        constructor() {
            super();
        }

        static Bind(target: egret.DisplayObject, BehaviorClass, data?: any) {
            const b = new BehaviorClass() as ys.Behavior;
            b.Bind(target, data);
            return b;
        }

        Bind(v: egret.DisplayObject, data?: any) {
            this._target = v;
            this.data = data;
            this.OnStart();
            v.once(egret.Event.REMOVED_FROM_STAGE, this.OnStop, this);
        }

        protected data: any;

        private _target: egret.DisplayObject;
        public get target() {
            return this._target;
        }

        OnStart() {

        }

        OnStop() {

        }

    }
}