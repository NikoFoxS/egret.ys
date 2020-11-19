namespace ys {
	export class Sound {
		private sc: egret.SoundChannel;
		private mp3: string;
		private stopMusic() {
			if (this.sc) {
				this.sc.stop();
				this.sc = null;
			}
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


