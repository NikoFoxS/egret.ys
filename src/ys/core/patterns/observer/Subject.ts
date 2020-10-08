namespace ys {
    export class Subject {
        constructor() {
            this.list = [];
        }

        private list: ys.IObserver[];
        public registerObserver(o: ys.IObserver) {
            if (o instanceof ys.Script) {
                console.log('registerScript::', o.className);
            }
            this.list.push(o);
        }

        public removeObserver(o: ys.IObserver) {
            var idx = this.list.indexOf(o);
            if (idx != -1) {
                this.list.splice(idx, 1);
            }
        }

        public notify(handler: number, data?: any) {
            for (var i = 0; i < this.list.length; i++) {
                var o = this.list[i];
                if (o.ListInvoke().indexOf(handler) != -1) {
                    if (o instanceof ys.Script) {
                        console.log('OnInvoke::', o.className, 'handler', handler, 'data', data);
                    }
                    o.OnInvoke(handler, data);
                }

            }
        }
    }
}