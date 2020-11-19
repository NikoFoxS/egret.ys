namespace ys {

    export interface IObserver {
        listNotificationInterests(): any[];
        onNotification(name, data);
    }

    export class Subject {

        private static list: ys.IObserver[] = [];
        public static registerObserver(o: ys.IObserver) {
            Subject.list.push(o);
        }

        public static removeObserver(o: ys.IObserver) {
            var idx = Subject.list.indexOf(o);
            if (idx != -1) {
                Subject.list.splice(idx, 1);
            }
        }

        public static notify(handler: number, data?: any) {
            for (var i = 0; i < Subject.list.length; i++) {
                var o = Subject.list[i];
                if (o.listNotificationInterests().indexOf(handler) != -1) {
                    o.onNotification(handler, data);
                }

            }
        }
    }
}