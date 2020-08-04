namespace ys.mvc {
    export interface IInvoked {
        /**被触发 */
        OnInvoke(handler: string, data?: any): void;
    }

    export interface IInvoker {
        /**触发Service */
        InvokeService(handler, data, proxyName): void;
        /**触发Mediator */
        InvokeMediator(name: string, data?: any): void;
    }
}