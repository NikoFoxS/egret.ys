namespace ys {
    export interface IInvoked {
        /**被触发 */
        OnInvoke(handler: number | string, data?: any): void;
    }
}