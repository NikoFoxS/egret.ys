namespace ys.mvc {
    export interface IMediator {
        onRegister(): void;
        onRemove(): void;
        invoke(handler:string,data?:any):void;
    }
}