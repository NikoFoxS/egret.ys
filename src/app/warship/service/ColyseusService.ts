module app {
	export class ColyseusService extends ys.mvc.Service {
		public constructor() {
			super()
		}

		OnInvoke(handler: number | string, data: any): void {
			// throw new Error('need override OnInvoke()')
			switch (handler) {
				case 'connect':
					this.connect();
					break;
			}
		}

		async connect() {

			const client = new Colyseus.Client("ws://localhost:3000");

			client.joinOrCreate("my_room").then(room => {
				console.log("joined");
				room.onStateChange.once(function (state) {
					console.log("initial room state:", state);
				});

				// new room state
				room.onStateChange(function (state) {
					// this signal is triggered on each patch
				});

				// listen to patches coming from the server
				room.onMessage("messages", function (message) {
					console.log('message:',message)
					// var p = document.createElement("p");
					// p.innerText = message;
					// document.querySelector("#messages").appendChild(p);
				});

				// send message to room on submit
				// document.querySelector("#form").onsubmit = function (e) {
				// 	e.preventDefault();

				// 	var input = document.querySelector("#input");

				// 	console.log("input:", input.value);

				// 	// send data to room
				// 	room.send("message", input.value);

				// 	// clear input
				// 	input.value = "";
				// }
				ys.Context.STAGE.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
					room.send("message", 'hello world');
				},this);
				
			});

			// 	try {
			// 		const room = await client.joinOrCreate("chat");
			// 		console.log("joined successfully", room.sessionId);

			// 		room.state.players.onAdd = function (player, i) {
			// 			console.log("player joined!", player);
			// 		}

			// 		room.state.players.onRemove = function (player, i) {
			// 			console.log("player left!", player);
			// 		}

			// 		room.state.players.onChange = function (player, i) {
			// 			console.log("player has been updated!", player);
			// 		}

			// 		room.onStateChange((state) => {
			// 			console.log(`${room.sessionId} has a new state:`, state);
			// 		})

			// 		room.send("fire", { angle: 42 });

			// 	} catch (e) {
			// 		console.error("couldn't join room:", e);
			// 	}

			}

		}
	}