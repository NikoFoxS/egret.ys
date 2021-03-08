module script {
	export class Home extends ys.Script {
		public constructor() {
			super();
		}

		listNotification() {
			return [
				'Home.url',
				"Home.dom"
			];
		}

		onNotification(name, data) {
			switch (name) {
				case "Home.url":
					this.url(data);
					break;

				case "Home.dom":
					this.dom(data);
				break;
			}
		}

		onAdded() {

		}

		onRemove() {

		}

		url(data) {
			window.location.href = data;
		}

		dom(data)
		{
			let dClass = egret.getDefinitionByName(data);
			new dClass();
		}


	}
}