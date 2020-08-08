namespace ys {
	/**
	 * var clips = []; //序列帧的资源名称数组
	 * var cp = new MovieClip(clips,12);
	 * cp.play();
	 */
	export class MovieClip extends egret.Bitmap {

		public static PLAY_OVER: string = "play_over";
		public static FRAME_UPDATE: string = "frame_update";

		/**
		 * @param clips 序列帧的数组
		 * @param fps 帧频
		 */
		public constructor(clips: string[], fps: number) {
			super();

			this._clips = clips;
			this._fps = fps;
			this._frame = 0;
			this._totalFrame = clips.length;

			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.pause();
			}, this);
		}

		private _frame: number;
		private _totalFrame: number;
		private _clips: string[];
		private _fps: number;
		private _lastFrame: number;

		/**
		 * 销毁播放的资源
		 */
		public destroyRes(): void {
			var i = this._clips.length;
			while (i--) {
				RES.destroyRes(this._clips[i]);
			}
		}

		/**
		 * @param speed 播放的速度，正数为顺序播放，负数为倒序播放。
		 * 如果要循环播放，侦听播放完毕，再调用一次播放即可。
		 */
		public play(speed: number = 1): void {

			this._lastFrame = -1;
			this.frame = 0;

			var toFrame = 0;
			var time;
			if (speed > 0) {
				toFrame = this._totalFrame - 1;
			} else {
				toFrame = 0;
			}

			time = (toFrame - this._frame) / this._fps / speed * 1000;

			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({ frame: toFrame }, time).call(() => {
				this.dispatchEventWith(MovieClip.PLAY_OVER, false);
			});
		}

		/**
		 * 暂停
		 */
		public pause(): void {
			egret.Tween.pauseTweens(this);
		}

		/**
		 * 继续
		 */
		public resume(): void {
			egret.Tween.resumeTweens(this);
		}

		public set frame(f: number) {
			this._frame = f;
			var frame = Math.floor(this._frame);
			if (frame != this._lastFrame) {
				var res = RES.getRes(this._clips[frame]);
				if (res) {
					this.texture = RES.getRes(this._clips[frame]);
				}
				this._lastFrame = frame;
				this.dispatchEventWith(MovieClip.FRAME_UPDATE, false);
			}
		}

		/**
		 * 当前播放的帧
		 */
		public get frame() {
			return this._frame;
		}


	}
}

