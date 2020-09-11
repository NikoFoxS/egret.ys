namespace app {
	export class TestPage extends ys.View {
		public constructor() {
			super('');
		}

		OnStart() {

			// ys.SOLO.GET.addEventListener(ys.SOLO.ON_CONNNECT, () => {
			// 	const playerInfo = {
			// 		name: "user"+GG.randomInt(1000,9999),
			// 		customPlayerStatus: 1,
			// 		customProfile: "https://xxx.com/icon.png",
			// 	};

			// 	ys.SOLO.GET.match(playerInfo, 2, '1');
			// }, this);
			// ys.SOLO.GET.addEventListener(ys.SOLO.ON_MATCH_OK, () => {

			// }, this);
			// ys.SOLO.GET.setup('' + GG.randomInt(1000, 9999), 'obg-krwrque4', '6354b5a0d281657f3c796dbb842500b97280123e');
			// ys.SOLO.GET.connect('krwrque4.wxlagame.com');
			let rec = ys.newRect(200, 80, 0xff0000, 0,this);
			ys.layoutCenter(rec);
			this.btn = rec;

			this.addMediator(TestPageM);

			ys.newBitmap

			let btn_start: egret.Bitmap = ys.newBitmap('btn_start', this);
			this.btn_start = btn_start;
		}

		public btn_start;

		public btn: egret.Shape;

	}

	class TestPageM extends ys.mvc.Mediator {
		constructor() {
			super()
		}

		Install(): void {
			let v = this.GetView<TestPage>();
			v.btn.touchEnabled = true;
			v.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getInfo, this);

			// v.bindBehavior(v.btn, DragerBehavior, {})
		}

		private getInfo() {
			// let m = ys.showModal('准备获取用户信息!', 'Ok');
			// m.addEventListener('select', () => {
			// 	this.ServiceInvoke(CONST.SERVICE_GET_USER_DATA, {}, 'user')
			// }, this);
			WEB.navigateToURL('https://ssl.gongyi.qq.com/m/weixin/gopaylts.html?pid=215159&money=0.01&bid=100000240&sign=c28c4de59f0de798e93921bbcf978e9e&ref_url=/result.html')
		}
		Uninstall(): void {
			let v = this.GetView<TestPage>();
			v.btn.touchEnabled = false;
			v.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getInfo, this);
		}

		OnInvokeList(): any[] {
			return [
				CONST.HANDLER_UPDATE_USER_DATA
			];
		}

		OnInvoke(handler: number, data: any): void {
			switch (handler) {
				case CONST.HANDLER_UPDATE_USER_DATA:
					let buc = this.GetBucket('user');
					let vo = buc.data as UserKV
					let v = this.GetView<TestPage>();
					console.log('更新数据', vo, data);
					break;
			}
		}
	}
}

