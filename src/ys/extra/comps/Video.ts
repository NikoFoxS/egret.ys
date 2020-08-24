namespace ys {
	export class VideoOption {
		scaleMode: string = 'fixedWidth';//主要用固定宽的模式
		mute: boolean = false;
		x: number;
		y: number;
		width: number;//因为视频是等比缩放的。所以设置宽就好了，高会自动变。
	}

	export class Video extends egret.DisplayObject {
		public constructor() {
			super();
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

		public close() {
			if (this.video) {
				!this.video.paused && this.video.pause();
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
			v.style.position = "absolute";
			let x = option.x;
			let y = option.y;
			let w = option.width;

			let scale = 1;
			if (option.scaleMode == 'fixedWidth') {
				scale = window.innerWidth / ys.Context.STAGE_W;
			}
			x *= scale;
			y *= scale;
			w *= scale;
			this.video.style.left = x + 'px';
			this.video.style.top = y + 'px';
			this.video.style.width = w + 'px';

			v.addEventListener('ended', closeFun);

			v.src = url;
			v.play();

			var checkStart = () => {
				if (v.currentTime > 0.01) {
					onStart();
					this.removeEventListener(egret.Event.ENTER_FRAME, checkStart, this);
				}
			}
			this.addEventListener(egret.Event.ENTER_FRAME, checkStart, this);

			return v;
		}

	}
}

