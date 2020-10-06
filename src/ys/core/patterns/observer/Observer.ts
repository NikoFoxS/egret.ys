namespace ys {
    export interface IObserver {
        ListInvoke(): any[]
        OnInvoke(handler: number, data?: any): void
    }
}