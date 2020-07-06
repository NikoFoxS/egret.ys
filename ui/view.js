let viewParse = require('./viewParse');

var arguments = process.argv.splice(2);
// console.log('所传递的参数是：', arguments);
if (arguments.length < 1) {
    console.log('至少1个参数')
    console.log('如：node ui/view MyView')
    return;
}

let fileName = arguments[0];
let fs = require('fs');
let content = '';
let uiUrl = 'ui/' + fileName + '.yaml';
let uiArr = [];
try {
    content = fs.readFileSync(uiUrl, 'utf-8');
    // console.log(content.split('\n'));
    uiArr = content.split('\n');
    uiArr = uiArr.filter(val => {
        return val.indexOf('id:') != -1 && val.indexOf('#') == -1;
    })
    console.log(uiArr);
} catch (error) {
    console.warn(`无${uiUrl}`)
    return;
}
fileName = fileName + 'View'
console.log('----')
console.log('ui配置信息：')
console.log(uiArr);
console.log('----')


let path = `src/app/view/`;

var {createStr, propStr, layoutStr} = viewParse.parse(uiArr)
let date = new Date();
let ymd = [date.getFullYear(),date.getMonth()+1,date.getDate()]
let hms = [date.getHours(),date.getMinutes(),date.getSeconds()]
let time = ymd.join('-')+' '+hms.join(':')

let view =
`//界面布局和样式
module app {
//自动生成$${fileName}，会被覆盖。${time}
class $${fileName} extends ys.View {
    public constructor(className) {
	  super(className);
    }
    protected uiCreate(): void {
${createStr}
    }
    protected uiLayout(): void {
${layoutStr}
    }
${propStr}
}
//以下内容不会被覆盖
export class ${fileName} extends $${fileName} {
    public constructor() {
	  super(${fileName}Mediator);
      this.name = '${fileName}';
      console.log('创建页面',this.name);
    }

    protected uiCreate(): void {
        super.uiCreate();
    }

    protected uiLayout(): void {
        super.uiLayout();
    }
}

}
`

let mediator =
    `
//界面逻辑.
module app {
export class ${fileName}Mediator extends ys.Mediator {
        constructor(view: egret.DisplayObject) {
            super(view);
            this.name = '${fileName}Mediator';
        }
        //ui创建完就执行，在添加舞台上之前
        protected addLogic() {
            let v = <${fileName}>this.getView();
        }

        protected listenNotice() {
            return [];
        }

        protected onNotice(no: ys.Notice) {
            let v = <${fileName}>this.getView();
        }
    }
}
`

let url = path + fileName + '.ts';
try {
    let content = fs.readFileSync(url, 'utf-8');
    try {
        let arr1 = content.split('//以下内容不会被覆盖');
        let arr2 = view.split('//以下内容不会被覆盖');
        fs.writeFileSync(url, arr2[0]+'//以下内容不会被覆盖'+arr1[1]);
        console.log('覆盖', url)
    } catch (error) {

    }
} catch (error) {
    console.log('不能找到' + url, '新建文件>>')
    try {
        fs.writeFileSync(url, view);
        console.log('创建', url)
    } catch (error) {

    }

    try {
        let url2 = url.replace('.ts', 'Mediator.ts');
        fs.writeFileSync(url2, mediator);
        console.log('创建', url2)
    } catch (error) {

    }

}
