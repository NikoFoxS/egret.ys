namespace ys {

    class Inner {/**单例使用 */ }

    export class Subject {
        /**
         * 观察者列表
         * */
        public list: Observer[] = [];

        constructor(inner: Inner) {
            if (!(inner instanceof Inner)) {
                throw new Error('cant new sun.Subject');
            }
        }

        private static _instance: Subject;
        public static get GET(): Subject {
            if (!Subject._instance) {
                Subject._instance = new Subject(new Inner);
            }
            return Subject._instance;
        }

        /**
         * 注册观察者
         * */
        public registerObserver(o: Observer) {
            this.list.push(o);
        }

        /**
         * 移除观察者
         * */
        public removeObserver(o: Observer) {
            var idx = this.list.indexOf(o);
            if (idx != -1) {
                this.list.splice(idx, 1);
            }
        }

        /**
         * 向所有观察者派发消息
         * */
        public notify(name: any, data: any) {
            for (var i = 0; i < this.list.length; i++) {
                var o = this.list[i];
                if (o.listNotification().indexOf(name) != -1) {
                    o.onNotification(name, data);
                }

            }
        }
    }
}

