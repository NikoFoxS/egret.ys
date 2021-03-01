namespace ys {
    export interface IObserver {
        listNotification(): any[]
        onNotification(name: any, data: any)
    }
}

