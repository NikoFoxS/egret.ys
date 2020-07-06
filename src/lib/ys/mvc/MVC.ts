/**
 * 参照pureMVC编写的简易mvc框架
 * 实战目录：
 * -cotroller
 * |-CMD 储存命令的名字
 * |-CommandDoSomething 对应的具体命令
 * -model
 * |-someVO 数据
 * |-someProxy 数据代理
 * -view
 * |-SomeView 界面
 * |-SomeViewMediator 界面中间人
 */
module ys {

	export class MVC {

		public static MVC_NOTICE: string = 'on_mvc_notice';

		private static instance: MVC;
		public static get GET() {
			if (!MVC.instance) {
				MVC.instance = new MVC();
			}
			return MVC.instance;
		}

		public evt: egret.EventDispatcher;
		public constructor() {
			this.evt = new egret.EventDispatcher();
			this.proxy = {};
			this.commands = {};
			//处理命令
			this.evt.addEventListener(MVC.MVC_NOTICE, (e: egret.Event) => {
				var name = e.data.name;
				var data = e.data.data;
				var cmdclass = this.commands[name];
				if (cmdclass) {
					console.log('[MVC]:执行通知指令->',name);
					var cmd: NoticeCMD = new cmdclass();
					var no = new Notice();
					no.name = name;
					no.data = data;
					cmd.execute(no);
				}
			}, this);
		}

		/**
		 * 发送通知
		 */
		public sendNotice(name, data?) {
			this.evt.dispatchEventWith(MVC.MVC_NOTICE, false, { name: name, data: data });
		}

		//model
		private proxy: any;
		/**
		 * 注册代理。注册即实例化
		 */
		public registerProxy(ProxyClass) {
			var name = egret.getQualifiedClassName(ProxyClass);
			if (!this.proxy[name]) {
				this.proxy[name] = new ProxyClass();
			}
		}

		/**
		 * 移除代理
		 */
		public removeProxy(ProxyClass) {
			var name = egret.getQualifiedClassName(ProxyClass);
			this.proxy[name] = null;
			delete this.proxy[name];
		}
		/**
		 * 获取代理
		 */
		public getProxy(ProxyClass) {
			var name = egret.getQualifiedClassName(ProxyClass);
			return this.proxy[name];
		}

		//controller
		private commands: any;
		/**
		 * 注册命令,只保存commandClass，执行命令的时候，才动态实例化。
		 */
		public registerCommand(commandClass) {
			var name = egret.getQualifiedClassName(commandClass);
			if (!this.commands[name]) {
				this.commands[name] = commandClass;
			}
		}
		/**
		 * 移除命令
		 */
		public removeCommand(name) {
			this.commands[name] = null;
			delete this.commands[name];
		}
	}
}