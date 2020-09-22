namespace ys {
    export class Page extends UI implements RES.PromiseTaskReporter {
        constructor() {
            super();
        }

        onProgress?(current: number, total: number, resItem: RES.ResourceInfo | undefined): void {
            this.OnLoadProgress(current, total)
        }

        OnLoadStart(name: string) {

        }

        OnLoadProgress(current: number, total: number) {

        }

        OnLoadEnd(name: string) {

        }


    }
}