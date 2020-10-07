namespace script {
    export class ScaleShow extends ys.Script {
        OnRegister(data?: any) {
            var v: egret.DisplayObject = this.target as egret.DisplayObject;
            var {time, scale} = data;
            egret.Tween.removeTweens(v);
            egret.Tween.get(v).to({ scaleX: scale, scaleY: scale }, time, egret.Ease.backOut);
        }

        OnRemove() {

        }
    }

    export class ScaleHide extends ys.Script {
        OnRegister(data?: any) {
            var v: egret.DisplayObject = this.target as egret.DisplayObject;
            var {time, scale} = data;
            egret.Tween.removeTweens(v);
            egret.Tween.get(v).to({ scaleX: scale, scaleY: scale }, time, egret.Ease.backIn)
        }

        OnRemove() {

        }
    }
}