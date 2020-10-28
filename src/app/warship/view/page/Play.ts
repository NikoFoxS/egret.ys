namespace page {
    //负责元素添加，会根据前缀自动创建相应的显示对象。
    class UI {
    }

    export class PageTemplate extends ys.UI {
        constructor() {
            super();
        }
        /**调用Start之前，会自动给data赋值 */
        async Start() {
            this.CreateDisplayObject(UI);
            this.Script(Script);
        }

        /**布局 */
        Layout() {
            const data = this.data;
            const ui = this.ui as UI;
        }

    }

    class Script extends ys.Script {
        constructor() {
            super();
        }

        OnRegister(data?: any) {
            //添加事件
            const page = this.target as PageTemplate;
            const ui = page.ui;

            //移除事件
            this.OnRemove = () => {
            }
        }
        /**列出感兴趣的消息 */
        ListInvoke(): any[] {
            return [];
        }
        /**处理感兴趣的消息 */
        OnInvoke(handler: number, data?: any): void {
            switch (handler) {
                default:
                    break;
            }
        }

    }

}