namespace ys.mvc {
    export interface IUnit {
        /**当被安装 */
        Install(): void;
        /**当被卸载 */
        Uninstall(): void;
    }
}