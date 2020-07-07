module ys {
	/**弹层统一管理管理 */
	export class PopLayer {
		public constructor() {
		}

		public static popUp(d: egret.DisplayObject, blockAlpha = 0.7, blockTween: boolean = true, blockTweeTime = 300) {
			if (!PopLayer.popLayer) {
				PopLayer.popLayer = new egret.DisplayObjectContainer();
			}

			if (!PopLayer.popblock) {
				const s = new egret.Shape();
				s.graphics.beginFill(0x000000);
				s.graphics.drawRect(0,0,stageW,stageH);
				s.graphics.endFill();
				s.cacheAsBitmap = true;
				PopLayer.popblock = s;
				PopLayer.popblock.alpha = blockAlpha;
				PopLayer.popblock.cacheAsBitmap = true;
			}
			const block = PopLayer.popblock;
			block.scaleX = stageW / block.width;
			block.scaleY = stageH / block.height;
			const layer = PopLayer.popLayer;
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

			d.once(egret.Event.REMOVED_FROM_STAGE, () => {
				//remove后，numChildren不会马上-1
				if (layer.numChildren == 2) {
					if (blockTween) {
						egret.Tween.get(block).to({ alpha: 0 }, blockTweeTime).call(() => {
							GG.removeDisplayObject(layer);
						});
					} else {
						GG.removeDisplayObject(layer);
					}


				} else {
					layer.addChildAt(block, layer.numChildren - 3);
				}
			}, this);
		}

		private static popblock: egret.Shape;
		private static popLayer: egret.DisplayObjectContainer;
	}
}