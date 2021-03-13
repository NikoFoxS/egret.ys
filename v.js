var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);
// if (arguments.length < 1) {
//     console.log('至少1个参数')
//     console.log('如：node ui/view MyView')
//     return;
// }
if (arguments.length > 1) {
    let fs = require('fs');

    let type = arguments[0];
    let arg = arguments[1];
    if (type == 'json') {
        try {
            let json = {
                prop: {},
                child: []
            }
            let url = `./resource/${arg}.json`
            fs.writeFileSync(url, JSON.stringify(json));
            console.log('创建', url)
        } catch (error) {
            console.log(error);
        }
    } else if (type == 'ui') {
        try {
            let jsonStr = fs.readFileSync(`./resource/${arg}.json`, 'utf-8');

            let props = '';
            let vars = '';

            let json = JSON.parse(jsonStr);

            console.log(json);

            let findVars = (json) => {
                let child = json.child;
                if (child) {
                    for (var i = 0; i < child.length; i++) {
                        let node = child[i];
                        if (node.prop) {
                            if (node.prop.hasOwnProperty('var')) {
                                let va = node.prop.var;
                                props += '\n' + va + ':' + node.type;
                                vars += '\nlet ' + va + ` = this.getVar<${node.type}>('${va}')`
                            }
                        }

                        findVars(child);
                    }
                }

            }

            findVars(json);

            let jsonName = arg + '_json';
            let className = `UI${arg}`
            let url = `./src/app/ui/${className}.ts`

            let classStr = `
namespace ui {
	export class ${className} extends ys.UIComponent{
		public constructor() {
			super();
			this.json = RES.getRes('${arg}_json');
			${vars}
			this.init();
		}
        ${props}
		private init():void
		{
			
		}
	}
}
            `
            fs.writeFileSync(url, classStr);
            console.log('创建', url)
        } catch (error) {
            console.log(error);
        }
    }
}