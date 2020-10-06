namespace ys {
    export interface IUnit {
        /**当被安装 */
        OnRegister(): void;
        /**当被卸载 */
        OnRemove(): void;
    }
}