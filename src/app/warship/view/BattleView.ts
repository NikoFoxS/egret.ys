namespace app{
	/**界面BattleView*/
	export class BattleView extends ys.Page
	{
		constructor()
		{
			super();
			this.Init()
		}
		OnStart()
		{
			// this.create(this, () => {
			// 	this.OnReay();
			// 	this.addMediator(BattleViewMediator);
			// }, this);
		}
		async OnReay()
		{
			//开始
			this.bm_headimg_jpg.x = 100;

			this.shape_rec.drawCirle(100,0xff0000);
			this.shape_rec.y = 200;

			let a = new ys.Bitmap();
			a.src = 'resource/warship/ship.png'
			// await a.srcSync('resource/warship/ship.png');
			console.log(a.texture)
			this.addChild(a);
		}

		public bm_headimg_jpg:ys.Bitmap=null;
		public shape_rec:ys.Shape=null;
	}

	/**界面管理器*/
	// export class BattleViewMediator extends ys.mvc.Mediator
	// {
	// 	constructor()
	// 	{
	// 		super();
	// 	}
	// 	private v:BattleView;
	// 	/**当被安装*/
	// 	Install(): void {
	// 		this.v = this.GetView<BattleView>();
	// 		//添加界面管理逻辑
	// 		this.InvokeService('connect',{},'ColyseusService');
	// 	}
	// 	/**当被卸载*/
	// 	Uninstall(): void {
	// 	}
	// 	/**列出需要关注的invoke */
	// 	ListInvoke(): any[] {
	// 		return [];
	// 	}
	// 	/**处理invoke*/
	// 	OnInvoke(handler: number | string, data: any): void {
	// 	}
	// }
}