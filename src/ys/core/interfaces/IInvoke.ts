namespace ys {
    export interface IInvoked {
        /**被触发 */
        OnInvoke(handler: number | string, data?: any): void;
    }

    export interface IInvoker {
        /**触发Service */
        InvokeService(handler: any, data: any, proxyName: string): void;
        /**触发Mediator */
        InvokeScript(handler: any, data: any): void;
        /**获取Bucket */
        GetBucket(name): ys.Bucket;
    }
}