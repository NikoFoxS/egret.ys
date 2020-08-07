class UserBucket extends ys.mvc.Bucket {
	public constructor() {
		super();
	}

	Install(): void {
		this.SetData({name:'fox',sex:'male'},false);
	}

	Uninstall(): void {
		
	}
}

declare class UserData
{
	name:string
	sex:string
	coins:number
}