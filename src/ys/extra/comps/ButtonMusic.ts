module ys {

	class ButtonSwitch extends egret.Bitmap {
		private res: string[];
		constructor(res1, res2) {
			super();
			this.res = [res1, res2];
			this.on = true;
		}

		public enable() {
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSwitch, this);
		}

		public disable() {
			this.touchEnabled = false;
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSwitch, this);
		}

		private checkSwitch() {
			this.on = !this.on;
		}

		private _on: boolean;
		public get on() {
			return this._on;
		}
		public set on(b) {
			this._on = b;
			if (b) {
				this.texture = RES.getRes(this.res[0]);
				this.onSwitch(0);
			} else {
				this.texture = RES.getRes(this.res[1]);
				this.onSwitch(1);
			}
		}

		protected onSwitch(frame) {

		}

	}

	//音乐按钮
	export class ButtonMusic extends ButtonSwitch {
		constructor(res1, res2) {
			super(res1, res2);
			this.mp3 = '';
			this.on = false;
		}

		private _mute: boolean;
		public get mute(): boolean {
			return this._mute;
		}

		public set mute(v: boolean) {
			this._mute = v;
			if (v) {
				this.stopMusic();
			} else {
				if (this.mp3 != '') {
					this.playMusic(this.mp3);
				}
			}
		}

		protected onSwitch(frame) {
			this.mute = frame;
		}

		private sc: egret.SoundChannel;
		private mp3: string;
		private stopMusic() {
			if (this.sc) {
				this.sc.stop();
				this.sc = null;
			}
		}

		public playMusic(mp3) {
			this.stopMusic();
			this.mp3 = mp3;
			if (!this._mute) {
				let sound = <egret.Sound>RES.getRes(mp3);
				if (sound) {
					this.sc = sound.play();
				}
			}
		}

		public autoPlayMusic(mp3: string): void {
			if (window["WeixinJSBridge"]) {
				//微信
				window["WeixinJSBridge"].invoke('getNetworkType', {}, () => {
					this.playMusic(mp3);
				});

			} else if (window["WeiboJSBridge"]) {
				//微博
				window["WeiboJSBridge"].invoke('getNetworkType', {}, () => {
					this.playMusic(mp3);
				});

			} else if (window["AlipayJSBridge"]) {
				//支付宝
				window["AlipayJSBridge"].call('getNetworkType', function (result) {
					this.playMusic(mp3);
				});
			} else {
				//QQ系
				if (window["mqq"]) {
					document.addEventListener("DOMContentLoaded", function () {
						this.playMusic(mp3);
					}, false);
				} else {
					this.playMusic(mp3);
				}
			}
		}

		public playSFX(mp3) {
			if (!this._mute) {
				let sound = <egret.Sound>RES.getRes(mp3);
				sound && sound.play(0, 1);
			}
		}

	}



}


