var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    /**弹层统一管理管理 */
    var PopLayer = (function () {
        function PopLayer() {
        }
        PopLayer.popUp = function (d, blockAlpha, blockTween, blockTweeTime) {
            if (blockAlpha === void 0) { blockAlpha = 0.7; }
            if (blockTween === void 0) { blockTween = true; }
            if (blockTweeTime === void 0) { blockTweeTime = 300; }
            if (!PopLayer.popLayer) {
                PopLayer.popLayer = new egret.DisplayObjectContainer();
            }
            if (!PopLayer.popblock) {
                PopLayer.popblock = GG.newRectBlock(0x000000);
                PopLayer.popblock.alpha = blockAlpha;
                PopLayer.popblock.cacheAsBitmap = true;
            }
            var block = PopLayer.popblock;
            block.scaleX = stageW / block.width;
            block.scaleY = stageH / block.height;
            var layer = PopLayer.popLayer;
            stage.addChild(layer);
            layer.addChild(block);
            layer.addChild(d);
            block.alpha = blockAlpha;
            blockAlpha == 0 && (blockTween = false);
            if (layer.numChildren == 2 && blockTween) {
                egret.Tween.removeTweens(block);
                block.alpha = 0;
                egret.Tween.get(block).to({ alpha: blockAlpha }, blockTweeTime);
            }
            d.once(egret.Event.REMOVED_FROM_STAGE, function () {
                //remove后，numChildren不会马上-1
                if (layer.numChildren == 2) {
                    if (blockTween) {
                        egret.Tween.get(block).to({ alpha: 0 }, blockTweeTime).call(function () {
                            GG.removeDisplayObject(layer);
                        });
                    }
                    else {
                        GG.removeDisplayObject(layer);
                    }
                }
                else {
                    layer.addChildAt(block, layer.numChildren - 3);
                }
            }, this);
        };
        return PopLayer;
    }());
    ys.PopLayer = PopLayer;
    __reflect(PopLayer.prototype, "ys.PopLayer");
})(ys || (ys = {}));
//# sourceMappingURL=PopLayer.js.map