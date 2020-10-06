namespace ys {
    export class Invoker {
        InvokeService(handler: any, data: any, name: number) {
            ys.Facade.GET.controller.InvokeService(handler, data, name);
        }

        InvokeScript(handler: any, data?: any) {
            ys.Facade.GET.view.invokeScript(handler, data)
        }

        GetBucket(bucName: any) {
            return ys.Facade.GET.model.getBucket(bucName);
        }
    }
}