namespace tb {
    const my = (<any>window).my;
    export function alert(content: string) {
        my && my.alert({ content: content });
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
