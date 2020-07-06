
class LoadingUI extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        let rec = GG.newRect(stageW, stageH, 0x000000);
        this.addChild(rec);

        this.label = GG.newLabel(0xffffff,30,this);  //GG.newText(0xffffff,30,this);
        this.label.textAlign = 'center';
        this.label.width = stageW;
        this.label.y = stageHalfH;

    }

    public label:egret.TextField;

    public onLoaded(group)
    {

    }

    public onProgress(loaded, total) {
        let per = 100 * loaded / total;
        this.label.text = 'Loading ' + per.toFixed() + '%';
    }
}
