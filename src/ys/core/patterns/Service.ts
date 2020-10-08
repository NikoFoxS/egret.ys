namespace ys {

	export class Service implements IUnit, IInvoked {
		public constructor() {
			this._className = egret.getQualifiedClassName(this);
			this.invoker = new ys.Invoker();
		}
		private _className:string;
		public get className()
		{
			return this._className;
		};

		protected invoker: ys.Invoker;

		OnRegister() {

		}

		OnRemove() {

		}

		OnInvoke(handler: number | string, data: any): void {
			throw new Error('need override OnInvoke()')
		}

	}
}
