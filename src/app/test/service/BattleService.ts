namespace app {
	export class BattleService extends ys.mvc.Service {
		public constructor() {
			super();
			ys.VS.GET.addEventListener(ys.VS.ON_JOIN_OK, this.onJoin, this);
			ys.VS.GET.addEventListener(ys.VS.ON_JOIN_KO, this.onJoin, this);
			ys.VS.GET.addEventListener(ys.VS.ON_MATCH_OK, this.onMatch, this);
			ys.VS.GET.addEventListener(ys.VS.ON_MATCH_KO, this.onMatch, this);
		}

		private onJoin(e: egret.Event) {
			if (e.type == ys.VS.ON_JOIN_OK) {
				let list = e.data as MGOBE.types.PlayerInfo[]
				this.InvokeMediator('', {});
			} else {
				this.InvokeMediator('', {});
			}

		}

		private onMatch(e: egret.Event) {
			// if (e.type == ys.VS.ON_MATCH_OK) {
			// 	let list = e.data as MGOBE.types.PlayerInfo[]
			// 	this.MediatorInvoke('', {});
			// } else {
			// 	this.MediatorInvoke('', {});
			// }
		}

		private connect(openid) {
			ys.VS.GET.setup(openid, config().gameId, config().secretKey);
			ys.VS.GET.connect(config().url);
		}

		joinPlay() {
			ys.VS.GET.once(ys.VS.ON_CONNNECT, () => {
				const playerInfo = {
					name: "user" + ys.randomInt(1000, 9999),
					customPlayerStatus: 1,
					customProfile: "https://xxx.com/icon.png",
				};

				ys.VS.GET.joinPlay(playerInfo, 5, 'shipwar');

			}, this);

			this.connect('11111');
		}

		matchPlay() {
			ys.VS.GET.once(ys.VS.ON_CONNNECT, () => {
				const playerInfo = {
					name: "user" + ys.randomInt(1000, 9999),
					customPlayerStatus: 1,
					customProfile: "自定义信息",
				};

				ys.VS.GET.matchPlay(playerInfo, 'match-gvm5ja89');
			}, this);

			this.connect('11111');
		}

		OnInvoke(handler: number | string, data: any): void {
			switch (handler) {
				case CONST.SERVICE_GET_USER_DATA:
					break;
			}
		}


	}
}