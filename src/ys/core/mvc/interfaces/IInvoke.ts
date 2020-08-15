namespace ys.mvc {
    export interface IInvoked {
        /**被触发 */
        OnInvoke(handler: number | string, data?: any): void;
    }

    export interface IInvoker {
        /**触发Service */
        ServiceInvoke(handler:any, data:any, proxyName:string): void;
        /**触发Mediator */
        MediatorInvoke(handler:any, data: any): void;
        /**获取Bucket */
        BucketGet(name): ys.mvc.Bucket;
    }
}