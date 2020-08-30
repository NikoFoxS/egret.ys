namespace ys {

	/**
	 * 腾讯mgobe联机对战引擎
	 */
	export class VS extends egret.EventDispatcher {
		private static _instance: ys.VS;
		public static get GET() {
			if (!VS._instance) {
				VS._instance = new VS();
			}
			return VS._instance;
		}
		constructor() {
			super();
			const room = new MGOBE.Room();
			// 广播：房间有新玩家加入
			room.onJoinRoom = this.onJoinRoom.bind(this);
			// 广播：房间有玩家退出
			room.onLeaveRoom = this.onLeaveRoom.bind(this);
			// 其他广播
			room.onUpdate = this.onUpdate.bind(this);
			//其他玩家的网络状态
			room.onChangePlayerNetworkState = this.onChangePlayerNetworkState.bind(this);
			//收到玩家发送的消息
			room.onRecvFromClient = this.onRecvFromClient.bind(this);
			//收到服务发送的消息
			room.onRecvFromGameSvr = this.onRecvFromGameSvr.bind(this);

			this.room = room;
		}

		private onJoinRoom(event: MGOBE.types.BroadcastEvent<MGOBE.types.JoinRoomBst>) {
			console.log("新玩家加入", event);
			this.dispatchEventWith(VS.ON_PLAYER_JOIN,false,event.data);
		}

		private onLeaveRoom(event: MGOBE.types.BroadcastEvent<MGOBE.types.LeaveRoomBst>) {
			console.log("玩家退出", this.room.roomInfo);
			this.dispatchEventWith(VS.ON_PLAYER_LEAVE,false,event.data);
		}

		private onUpdate(room?: MGOBE.Room) {
			if (!room.networkState.COMMON) {
				console.log('自己网络断开了')
				this.dispatchEventWith(VS.ON_DISCONNECT);
			}
		}

		private onChangePlayerNetworkState(event: MGOBE.types.BroadcastEvent<MGOBE.types.ChangePlayerNetworkStateBst>) {
			if (event.data.networkState === MGOBE.ENUM.NetworkState.COMMON_OFFLINE) {
				console.log("玩家掉线", event);
				this.dispatchEventWith(VS.ON_PLAYER_OFFLINE, false, event.data);
			}

		}

		private onRecvFromClient(event: MGOBE.types.BroadcastEvent<MGOBE.types.RecvFromClientBst>) {
			// console.log('onRecvFromClient', event);
			this.dispatchEventWith(VS.ON_MSG_FROM_CLIENT, false, event.data);
		}

		private onRecvFromGameSvr(event: MGOBE.types.BroadcastEvent<MGOBE.types.RecvFromGameSvrBst>) {
			this.dispatchEventWith(VS.ON_MSG_FROM_SERVER, false, event.data);
		}

		static ON_CONNNECT: string = 'on_connect';
		static ON_DISCONNECT: string = 'on_disconnect';

		static ON_MATCH_OK: string = 'on_match_ok';
		static ON_MATCH_KO: string = 'on_match_ko';

		static ON_JOIN_OK: string = 'on_join_ok';
		static ON_JOIN_KO: string = 'on_join_ko';

		static ON_MSG_FROM_CLIENT: string = 'on_msg_from_client';
		static ON_MSG_FROM_SERVER: string = 'on_msg_from_server';

		static ON_PLAYER_OFFLINE: string = 'on_player_offline';
		static ON_PLAYER_JOIN: string = 'on_player_join';
		static ON_PLAYER_LEAVE: string = 'on_player_leave';

		private gameInfo;
		private room: MGOBE.Room;
		setup(openId, gameId, secretKey) {
			this.gameInfo = {
				openId: openId,//唯一标识
				gameId: gameId,// 替换为控制台上的“游戏ID”
				secretKey: secretKey,// 替换为控制台上的“游戏key”
			}
			console.log('openid', openId)
		}

		private _serverTime: number;
		connect(url: string, reconnectMaxTimes = 5, reconnectInterval = 1000, resendInterval = 1000, resendTimeout = 10000, ) {
			console.log('连接服务器...')
			MGOBE.Listener.init(this.gameInfo,
				{
					url: url, reconnectMaxTimes: reconnectMaxTimes,
					reconnectInterval: reconnectInterval, resendInterval: resendInterval,
					resendTimeout: resendTimeout
				}, event => {
					if (event.code === 0) {
						console.log('MGOBE 连接成功!', event)
						this._serverTime = event.data.serverTime;
						MGOBE.Listener.add(this.room);
						this.dispatchEventWith(ys.VS.ON_CONNNECT);
					} else {
						console.log('MGOBE 连接失败!')
					}
				});
		}

		/**发送消息给所有玩家，包含自己 */
		msgToAll(str: string) {
			const sendToClientPara = {
				recvType: MGOBE.ENUM.RecvType.ROOM_ALL,
				recvPlayerList: [],
				msg: str,
			};

			this.room.sendToClient(sendToClientPara, event => console.log(event));
		}
		/**发送消息给除了自己的其他玩家 */
		msgToOthers(str: string) {
			const sendToClientPara = {
				recvType: MGOBE.ENUM.RecvType.ROOM_OTHERS,
				recvPlayerList: [],
				msg: str,
			};

			this.room.sendToClient(sendToClientPara, event => console.log(event));
		}
		/**发送消息给部分玩家 */
		msgToSome(str: string, list: string[]) {
			const sendToClientPara = {
				recvType: MGOBE.ENUM.RecvType.ROOM_SOME,
				recvPlayerList: list,
				msg: str,
			};

			this.room.sendToClient(sendToClientPara, event => console.log(event));
		}

		/**io类快速游戏 */
		joinPlay(playerInfo, maxPlayers: number, roomType: string, leaveRoom = false) {
			console.log('检查玩家是否已经加房')
			MGOBE.Room.getMyRoom(event => {
				if (event.code === 0) {
					// 设置房间信息到 room 实例
					this.room.initRoom(event.data.roomInfo);
					if (leaveRoom) {
						this.leaveRoom(() => {
							this.matchRoom(playerInfo, maxPlayers, roomType);
						}, this);
					} else {
						this.dispatchEventWith(ys.VS.ON_JOIN_OK, false, event.data.roomInfo.playerList);
					}

					return console.log("玩家已在房间内：", event.data.roomInfo);
				}

				console.log("玩家不在房间内");
				if (event.code === 20011) {
					this.matchRoom(playerInfo, maxPlayers, roomType);
				}
			});


		}

		private matchRoom(playerInfo, maxPlayers: number, roomType: string) {
			const matchRoomPara = {
				playerInfo: playerInfo,
				maxPlayers: maxPlayers,
				roomType: roomType
			}
			console.log('快速加房', playerInfo, maxPlayers, roomType);
			this.room.matchRoom(matchRoomPara, event => {

				if (event.code == 0) {
					console.log("加房成功", event);
					this.dispatchEventWith(ys.VS.ON_JOIN_OK, false, event.data.roomInfo.playerList);
				} else {
					console.log("匹配失败", event);
					this.dispatchEventWith(ys.VS.ON_JOIN_KO);
				}
			});
		}

		/**匹配类游戏，根据后台设置的匹配规则进行匹配 */
		matchPlay(playerInfo, matchCode) {
			const matchPlayersPara = {
				playerInfo,
				matchCode: matchCode,
			};
			let room = this.room;

			// 监听匹配结果
			MGOBE.Room.onMatch = (event) => {

				if (event.data.errCode === MGOBE.ErrCode.EC_OK) {
					console.log("组队匹配成功");
					room.initRoom(event.data.roomInfo);
					this.dispatchEventWith(ys.VS.ON_MATCH_OK, false, event.data.roomInfo.playerList);
				} else {
					console.log("组队匹配失败");
					this.dispatchEventWith(ys.VS.ON_MATCH_KO);
				}
			};

			// 发起匹配
			room.matchPlayers(matchPlayersPara, event => {
				if (event.code === 0) {
					// console.log("请求成功");
				} else {
					// console.log("请求失败", event.code);
					this.dispatchEventWith(ys.VS.ON_MATCH_KO);
				}
			});
		}

		leaveRoom(callback: Function, ref: any) {
			this.room.leaveRoom({}, event => {
				if (event.code === 0) {
					// 退房成功
					console.log("退房成功", event.data.roomInfo);
					// 可以使用 initRoom 清除 roomInfo
					this.room.initRoom();
					callback.call(ref);
				}
			});
		}


	}
}