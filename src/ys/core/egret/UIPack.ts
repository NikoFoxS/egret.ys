namespace ys {
	export class UI extends ys.Container {

		constructor() {
			super();
		}

		async Start(data?: any) {

		}

		async setup(LayoutClass, ScriptClass, data?: any) {
			//布局
			const layout = new LayoutClass() as ys.Layout;
			Layout.BindView(layout, this);
			await layout.OnCreate(data);

			const script = new ScriptClass() as ys.Script;
			script.Bind(layout, data);

		}

	}
}