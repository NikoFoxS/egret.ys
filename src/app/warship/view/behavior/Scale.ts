namespace behavior {
    export class ScaleShow extends ys.Behavior {
        OnStart(data: any) {
            var v: egret.DisplayObject = this.target as egret.DisplayObject;
            var {time, scale} = data;
            egret.Tween.removeTweens(v);
            egret.Tween.get(v).to({ scaleX: scale, scaleY: scale }, time, egret.Ease.backOut);
        }

        OnStop() {

        }
    }

    export class ScaleHide extends ys.Behavior {

        OnStart(data: any) {
            var v: egret.DisplayObject = this.target as egret.DisplayObject;
            var {time, scale} = data;
            egret.Tween.removeTweens(v);
            egret.Tween.get(v).to({ scaleX: scale, scaleY: scale }, time, egret.Ease.backIn)
        }

        OnStop() {

        }
    }
}