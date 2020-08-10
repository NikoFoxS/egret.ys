namespace ys {
	export class PK extends egret.EventDispatcher {
		private static _instance: ys.PK;
		public static get GET() {
			if (!PK._instance) {
				PK._instance = new PK();
			}
			return PK._instance;
		}
		constructor() {
			super();
			const room = new MGOBE.Room();
			// 广播：房间有新玩家加入
			room.onJoinRoom = event => console.log("新玩家加入", event.data);
			// 广播：房间有玩家退出
			room.onLeaveRoom = event => console.log("玩家退出", event.data);
			// 广播：房间被解散
			room.onDismissRoom = event => console.log("房间被解散");
			// 其他广播
			this.room = room;

		}
		static ON_CONNNECT: string = 'on_connect';
		static ON_MATCH_OK: string = 'on_match_ok';
		static ON_MATCH_KO: string = 'on_match_ko';

		private gameInfo;
		private room: MGOBE.Room;
		setup(openId, gameId, secretKey) {
			this.gameInfo = {
				openId: openId,
				gameId: gameId,// 替换为控制台上的“游戏ID”
				secretKey: secretKey,// 替换为控制台上的“游戏key””
			}
		}

		connect(url: string, reconnectMaxTimes = 5, reconnectInterval = 1000, resendInterval = 1000, resendTimeout = 10000, ) {
			MGOBE.Listener.init(this.gameInfo,
				{
					url: url, reconnectMaxTimes: reconnectMaxTimes,
					reconnectInterval: reconnectInterval, resendInterval: resendInterval,
					resendTimeout: resendTimeout
				}, event => {
					if (event.code === 0) {
						console.log('mgobe connected!')
						MGOBE.Listener.add(this.room);
						this.dispatchEventWith(ys.PK.ON_CONNNECT);
					}
				});
		}

		match(playerInfo, maxPlayers: number, roomType: string) {

			MGOBE.Room.getMyRoom(event => {
				if (event.code === 0) {
					// 设置房间信息到 room 实例
					this.room.initRoom(event.data.roomInfo);
					return console.log("玩家已在房间内：", event.data.roomInfo);
				}

				if (event.code === 20011) {

					const matchRoomPara = {
						playerInfo: playerInfo,
						maxPlayers: maxPlayers,
						roomType: roomType
					}

					this.room.matchRoom(matchRoomPara, event => {
						console.log("匹配结果", event);
						if (event.code == 0) {

							this.dispatchEventWith(ys.PK.ON_MATCH_OK);
						} else {
							this.dispatchEventWith(ys.PK.ON_MATCH_KO);
						}
					});
					return console.log("玩家不在房间内");
				}

				return console.log("调用失败");
			});


		}
	}
}