namespace tb {
    const my = (<any>window).my;
    const logTxt: egret.TextField = new egret.TextField();
    logTxt.background = true;
    logTxt.width = 200;
    logTxt.wordWrap = true;
    logTxt.multiline = true;
    logTxt.backgroundColor = 0x000000;
    logTxt.size = 15;
    logTxt.lineSpacing = 5;
    logTxt.touchEnabled = true;
    logTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { logTxt.alpha == 1 ? logTxt.alpha = 0 : logTxt.alpha = 1 }, null);

    export function log(...arg) {
        if (stage) {
            stage.addChild(logTxt);
            var s = arg.join(',');
            logTxt.text += s + '\n';
        }
    }

    export function alert(content: string) {
        my && my.alert({ content: content });
    }

    export function logClear() {
        logTxt.text = '';
    }

    export function exit() {
        my && my.exit();
    }

    export function getAuthUserInfo(cb: Function, ref: any) {
        if (my) {
            my.authorize({
                scopes: 'scope.userInfo',
                success: (res) => {
                    my.getAuthUserInfo({
                        success: (userInfo) => {
                            cb.call(ref, userInfo);
                        }
                    });
                },
            });
        }
    }

    export function addToCart() {
        if (my) {
            my.tb.addToCart({
                itemIds: '41912405175_3800628386750_5',
                exts: 'text:text|123:456',
                success: (res) => {
                    my.alert({ content: "success" + JSON.stringify(res) })
                },
                fail: (res) => {
                    my.alert({ content: "fail" + JSON.stringify(res) })
                    console.log(res)
                },
            })
        }
    }

    export function isMenber(cb:Function,ref:any)
    {

    }

    export function saveFile()
    {
        
    }


}
