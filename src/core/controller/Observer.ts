namespace ys {
    export class Observer {
        /**
         * 列出感兴趣的notification
         */
        listNotification(): any[] {
            return [];
        }
        /**
         * 处理通知
         * @param name 通知的识别名字
         * @param data 数据
         */
        onNotification(name: any, data: any) {

        }
    }
}

