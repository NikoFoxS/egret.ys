namespace ys.mvc {
    export interface IProxy {
        onRegister(): void;
        onRemove(): void;
        invoke(handler: string,data?:any): void;
        getData<T>(name):T;
    }
}