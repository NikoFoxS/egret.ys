
//界面逻辑.
module app {
export class TestViewMediator extends ys.Mediator {
        constructor(view: egret.DisplayObject) {
            super(view);
            this.name = 'TestViewMediator';
        }
        //ui创建完就执行，在添加舞台上之前
        protected addLogic() {
            let v = <TestView>this.getView();
        }

        protected listenNotice() {
            return [];
        }

        protected onNotice(no: ys.Notice) {
            let v = <TestView>this.getView();
        }
    }
}
