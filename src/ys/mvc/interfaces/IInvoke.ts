namespace ys.mvc {
    export interface IInvoked {
        OnInvoke(handler: string, data?: any): void;
    }

    export interface IInvoker {
        InvokeService(handler, data, proxyName): void;
        InvokeMediator(name: string, data?: any): void;
    }
}