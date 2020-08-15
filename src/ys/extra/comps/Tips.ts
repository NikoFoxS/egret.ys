module ys {
	export class Tips {
		public constructor() {
		}

		/**弱提示 */
		public static showToast(msg: string, x: number, y: number, icon = '', duration = 1500) {
			msg = msg.trim().replace(/\n/ig, '');
			if (msg == '') return;
			const toast = new Toast({ msg: msg, icon: icon });
			toast.x = x;
			toast.y = y;
			toast.show(duration);
			return toast;
		}

		/**模态对话框 */
		public static showModal(msg, confirmTxt = '确定', cancelTxt = '取消', size = 40) {
			const m = new ys.Modal({ msg: msg, confirm: confirmTxt, cancel: cancelTxt, fontSize: size });
			return m;
		}

		/**显示加载提示 */
		private static loading: Loading;
		public static showLoading(txt = '加载中', step = true) {
			if (!Tips.loading) {
				Tips.loading = new Loading();
			}
			const loading = Tips.loading;
			loading.show(txt, step);
			stage.addChild(loading);
			return loading;
		}

		/**删除加载提示 */
		public static hideLoading() {
			if (Tips.loading) {
				Tips.loading.hide();
			}
		}
	}

	export class Loading extends egret.DisplayObjectContainer {
		constructor() {
			super();
			const block = new egret.Shape();
			block.graphics.beginFill(0x000000);
			block.graphics.drawRect(0, 0, stageW, stageH);
			block.graphics.endFill();
			block.cacheAsBitmap = true;
			this.addChild(block);
			block.alpha = 0.5;
			block.cacheAsBitmap = true;
			block.touchEnabled = true;
			this.block = block;

			const ctn = GG.newContainer();
			this.addChild(ctn);

			const width = 200;
			const height = 200;
			const bg = GG.newRectRound(width, height, 0x000000, 40, 40, ctn);
			bg.alpha = 0.7;

			const s = new egret.Shape();
			s.graphics.clear();
			ctn.addChild(s);

			let i = 10;
			const r = 22;
			const R = 35;
			let x, y, ang;
			while (i--) {
				ang = i * Math.PI * 2 / 10 + Math.PI;
				s.graphics.lineStyle(7, 0xffffff, 0.1 + (10 - i) / 10);
				x = Math.sin(ang) * r;
				y = Math.cos(ang) * r;
				s.graphics.moveTo(x, y);
				x = Math.sin(ang) * R;
				y = Math.cos(ang) * R;
				s.graphics.lineTo(x, y);
			}
			s.x = width * 0.5;
			s.y = height * 0.5 - 20;
			s.cacheAsBitmap = true;
			this.flower = s;

			const la = GG.newLabel(ctn);
			la.textColor = 0xffffff;
			la.size = 25;
			la.width = width;
			la.textAlign = 'center';
			la.y = height - 55;
			this.label = la;

			this.ctn = ctn;

			this.show('加载中');
		}
		private label: ys.Label;
		private flower: egret.Shape;
		private ctn: egret.DisplayObjectContainer;
		public block: egret.Shape;

		public show(txt, step = true) {
			const ctn = this.ctn;
			const block = this.block;
			block.alpha = 0.5;
			this.resize();
			GG.layoutCenter(ctn);

			this.label.text = txt;
			const flower = this.flower;
			flower.rotation = 0;
			flower['r'] = 0;
			let time = 1000;
			if (!step) {
				time = 2000;
			}
			egret.Tween.removeTweens(flower);
			egret.Tween.get(flower, {
				loop: true, onChange: () => {
					const r = flower['r'];
					if (step) {
						flower.rotation = 36 * Math.floor(r / 36);
					} else {
						flower.rotation = r;
					}

				}
			}).to({ r: 360 }, time);

			stage.addEventListener(egret.Event.RESIZE, this.resize, this);
		}

		public resize() {
			const block = this.block;
			block.scaleX = stageW / block.width;
			block.scaleY = stageH / block.height;
		}

		public hide() {
			stage.removeEventListener(egret.Event.RESIZE, this.resize, this);
			egret.Tween.removeTweens(this.flower);
			GG.removeDisplayObject(this);
		}
	}

	export class Modal extends egret.DisplayObjectContainer {
		constructor({msg, confirm = '', cancel = '', fontSize = 50, txtWidth = 500}) {
			super();

			const ctn = this;

			const label = new ys.Label();
			label.size = fontSize;
			label.text = msg;
			label.lineSpacing = fontSize * 0.5;
			label.textColor = 0x000000;
			label.width = txtWidth;
			const padding = 66;
			const bgw = padding * 2 + txtWidth;
			const btnH = 120;
			const bgh = label.textHeight + padding * 2 + btnH;
			label.x = label.y = padding;
			this.content = label;

			const bg = GG.newRectRound(bgw, bgh, 0xffffff, 40, 40);
			ctn.addChild(bg);

			bg.graphics.lineStyle(1, 0x000000, 0.6);
			bg.graphics.moveTo(0, bgh - btnH);
			bg.graphics.lineTo(bgw, bgh - btnH);
			if (confirm != '' && cancel != '') {
				bg.graphics.moveTo(bgw * 0.5, bgh - btnH);
				bg.graphics.lineTo(bgw * 0.5, bgh);
			}
			bg.cacheAsBitmap = true;
			if (cancel != '') {
				const can = this.newBtnLabel(cancel, bgw * 0.5, btnH, fontSize);
				can.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
				can.y = bgh - btnH;
				ctn.addChild(can);
				this.cancel = can;
				if (confirm == '') {
					can.width = bgw;
				}
				this.once(egret.Event.REMOVED_FROM_STAGE, () => {
					can.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
				}, this);
			}

			if (confirm != '') {
				const cfm = this.newBtnLabel(confirm, bgw * 0.5, btnH, fontSize);
				cfm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
				cfm.y = bgh - btnH;
				cfm.x = bgw * 0.5;
				ctn.addChild(cfm);
				this.confirm = cfm;
				if (cancel == '') {
					cfm.x = 0;
					cfm.width = bgw;
				}
				this.once(egret.Event.REMOVED_FROM_STAGE, () => {
					cfm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
				}, this);
			}

			ctn.addChild(label);
		}

		private _select: string;
		public get selectLabel() {
			return this._select;
		}
		private onClick(e: egret.TouchEvent) {
			this._select = e.target.text;
			// console.log(this._select, e.target);
			this.dispatchEventWith('select', false);
			GG.removeDisplayObject(this);
		}

		private newBtnLabel(txt, w, h, size) {
			const label = new ys.Label();
			label.text = txt;
			label.width = w;
			label.height = h;
			label.size = size;
			label.textAlign = 'center';
			label.textColor = 0x000000;
			label.verticalAlign = "middle";
			label.touchEnabled = true;
			label.cacheAsBitmap = true;
			return label;
		}

		public content: ys.Label;
		public confirm: ys.Label;
		public cancel: ys.Label;
	}

	export class Toast extends egret.DisplayObjectContainer {
		constructor({msg, color = 0xffffff, bgColor = 0x000000, icon = '', bgAlpha = 0.8, padding = 30}) {
			super();
			const padding2 = padding * 2;
			const t = new egret.TextField();
			this.addChild(t);
			t.text = msg;
			t.size = 35;
			t.textColor = color;
			if (t.textWidth > stageW - padding) {
				t.width = stageW - padding;
			} else {
				t.width = t.textWidth;
			}
			if (t.width < 1) {
				t.width = padding2;
			}
			t.height = t.textHeight;
			t.textAlign = 'center';
			t.verticalAlign = egret.VerticalAlign.MIDDLE;

			let icoH = 0;
			if (icon != '') {
				var ico = GG.newBitmap(icon, this);
				GG.setAnchor(ico, 0.5, 0);
				if (ico.width > t.width) {
					t.width = ico.width;
				}

				ico.x = t.width * 0.5 + padding;
				ico.y = padding;
				icoH = ico.height + padding;
			}
			//圆角矩形
			var bg = GG.newRectRound(t.width + padding2, t.height + padding2 + icoH, bgColor, padding, padding) // new egret.Shape();
			bg.alpha = bgAlpha;
			this.addChildAt(bg, 0);

			this.anchorOffsetX = this.width * 0.5;
			t.x = padding;
			t.y = padding + icoH;
			this.cacheAsBitmap = true;

		}

		public show(duration = 1500) {
			this.alpha = 0;
			egret.Tween.get(this).to({ alpha: 1 }, 300).wait(duration).to({ alpha: 0 }, 300).call(() => {
				GG.removeDisplayObject(this);
			});
		}
	}
}