namespace ys {
	export class VideoOption {
		scaleMode: string = 'fixedWidth';
		mute: boolean = false;
	}

	export class Video {
		public constructor() {
			this.video = document.createElement('video');
		}
		private video: HTMLVideoElement;

		public get videoElement() {
			return this.video;
		}

		public remove() {
			if (this.video && this.video.parentNode) {
				this.video.parentNode.removeChild(this.video);
			}
			this.video = null;
		}

		public pause() {
			if (this.video) {
				!this.video.paused && this.video.pause();
			}
		}

		public play()
		{
			this.video && this.video.play();
		}

		public close() {
			if (this.video) {
				this.pause();
				this.remove();
			}
		}

		public playInline(url, option: VideoOption, onStart, onEnded): HTMLElement {
			//创建video
			let v = this.video;

			//设置无框播放
			v.setAttribute('preload', 'auto');
			v.setAttribute('webkit-playsinline', 'true');
			v.setAttribute('playsinline', 'true');
			v.setAttribute('x-webkit-airplay', 'true');
			v.setAttribute('x5-video-player-type', 'h5');
			v.setAttribute('x5-video-player-fullscreen', 'true');
			v.setAttribute('x5-video-orientation', 'portraint');
			v.muted = option.mute;

			var closeFun = () => {
				v.removeEventListener('ended', closeFun);
				setTimeout(function () {
					onEnded();
					v.parentNode && v.parentNode.removeChild(v);
				}, 300);
			}
			//视频画面中心化处理。
			if (option.scaleMode == 'fixedWidth') {
				v.style.width = "100%";
			} else {
				v.style.height = "100%";
			}

			if (!egret.Capabilities.isMobile) {
				v.style.height = "100%";
			}
			v.style.top = "50%";
			v.style.left = "50%";
			v.style.transform = "translate(-50%,-50%)";
			v.style.position = "absolute";
			v.addEventListener('ended', closeFun);

			v.src = url;
			v.play();

			var checkStart = () => {
				if (v.currentTime > 0.01) {
					onStart();
					stage.removeEventListener(egret.Event.ENTER_FRAME, checkStart, this);
				}
			}
			stage.addEventListener(egret.Event.ENTER_FRAME, checkStart, this);

			return v;
		}

	}
}

