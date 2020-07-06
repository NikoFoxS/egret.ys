
let getValue = (key, arr) => {
    let value = '';
    let i = 0;
    let len = arr.length;
    while (i < len) {
        let s = arr[i];
        if (s.indexOf(`${key}:`) == 0) {
            value = s.replace(`${key}:`, '');
            break;
        }
        i++;
    }
    return value;
}

//创建
let getCreate = (varname, id, type, parent, arr) => {
    console.log(varname, type, parent);
    let create = '';
    parent == '' || parent == undefined ? (parent = 'this') : (parent = `this.${parent}`);

    switch (type) {
        case 'egret.Bitmap':
            create = `        this.${varname} = GG.newBitmap('${id}',${parent});\n`;
            break;

        case 'egret.DisplayObjectContainer':
            create = `        this.${varname} = GG.newContainer(${parent});\n`;
            break;

        case 'ys.Button':
            create = `        this.${varname} = GG.newButton('${id}',${parent});\n`;
            break;

        case 'ys.TextInput':
            var width = getValue('w', arr);
            var height = getValue('h', arr);
            if (width != '' && height != '') {
                create = `        this.${varname} = GG.newTextInput(${width},${height},${parent});\n`;
            } else {
                console.log('创建TextInput失败，无w和h属性')
            }

            break;

        case 'ys.Label':
            create = `        this.${varname} = GG.newLabel(${parent});\n`;
            break;

        case 'ys.Image':
            create = `        this.${varname} = GG.newImage(${parent});\n`;
            break;

        case 'egret.Shape.rec':
            var width = getValue('w', arr);
            var height = getValue('h', arr);
            var color = getValue('color', arr);
            create = `        this.${varname} = GG.newRect(${width},${height},${color},${parent});\n`;
            break;
    }
    //添加到显示列表
    if (create != '') {
        // create += `        ${parent}.addChild(this.${varname});\n`;
    }


    return create;
}

let getTypeById = (id) => {
    let type = 'egret.Bitmap'
    if (id.indexOf('btn-') == 0) {
        type = 'ys.Button'
    } else if (id.indexOf('label-') == 0) {
        type = 'ys.Label'
    } else if (id.indexOf('input-') == 0) {
        type = 'ys.TextInput'
    } else if (id.indexOf('con-') == 0) {
        type = 'egret.DisplayObjectContainer'
    }else if(id.indexOf('rec-') == 0)
    {
        type = 'egret.Shape.rec'
    }

    return type;
}

//属性
let getProp = (varname, type) => {
    if(type == 'egret.Shape.rec')
    {
        type = 'egret.Shape';
    }
    let props = `    public ${varname}: ${type}\n`;
    return props;
}

let getInfo = (arr) => {
    let id = getValue('id', arr);
    let varname = getVarnameByID(id);
    let type = getTypeById(id);
    let parent = getParent(arr);
    return { id, varname, type, parent }
}

let getParent = (arr) => {
    let id = getValue('pid', arr);
    let varname = getVarnameByID(id);
    return varname;
}

let getVarnameByID = (id) => {
    let varname = id;
    varname = varname.replace(/-/ig, '_');
    varname = varname.replace('_jpg', '');
    varname = varname.replace('_jpeg', '');
    varname = varname.replace('_png', '');
    return varname;
}

//布局
let getLayout = (varname, arr) => {
    let layout = '';
    console.log('style:', arr);
    arr.forEach((el) => {
        if (el != '') {
            let ar = el.split(':');
            let key = ar[0];
            let val = ar[1];
            if (key != 'id' && key != 'pid' && varname.indexOf('rec') == -1) {
                let a = parseFloat(val);
                key == 'ax' && (key = 'anchorOffsetX');
                key == 'ay' && (key = 'anchorOffsetY');
                key == 'w' && (key = 'width');
                key == 'h' && (key = 'height');

                switch (key) {
                    case 'anchorOffsetX':
                        layout += `        this.${varname}.${key} = this.${varname}.width*${val};\n`;
                        break;

                    case 'anchorOffsetY':
                        layout += `        this.${varname}.${key} = this.${varname}.height*${val};\n`;
                        break;

                    case 'x':
                        if (val.indexOf('middle') == 0) {
                            let val2 = val.replace('middle', '');
                            layout += `        GG.layoutMiddleX(this.${varname},${val2});\n`;
                        } else if (val.indexOf('left') == 0) {
                            let val2 = val.replace('left', '');
                            layout += `        GG.layoutLeft(this.${varname},${val2});\n`;
                        } else if (val.indexOf('right') == 0) {
                            let val2 = val.replace('right', '');
                            layout += `        GG.layoutRight(this.${varname},${val2});\n`;
                        } else {
                            layout += `        this.${varname}.x = ${val};\n`;
                        }
                        break;

                    case 'y':
                        if (val.indexOf('middle') == 0) {
                             let val2 = val.replace('middle', '');
                            layout += `        GG.layoutMiddleY(this.${varname},${val2});\n`;
                        } else if (val.indexOf('top') == 0) {
                            let val2 = val.replace('top', '');
                            layout += `        GG.layoutTop(this.${varname},${val2});\n`;
                        } else if (val.indexOf('bottom') == 0) {
                            let val2 = val.replace('bottom', '');
                            layout += `        GG.layoutBottom(this.${varname},${val2});\n`;
                        } else {
                            layout += `        this.${varname}.y = ${val};\n`;
                        }

                        break;

                    default:
                        layout += `        this.${varname}.${key} = ${val};\n`;
                        break;
                }

            }
        }


    }, this);
    return layout;
}

let parse = (uiArr) => {
    let propStr = '';
    let createStr = '';
    let layoutStr = '';

    let arr = uiArr;
    arr.forEach(val => {
        //清除空格
        val = val.replace(/ /ig, '');

        let sArr = val.split(';');

        let { id, varname, type, parent } = getInfo(sArr)
        //属性
        propStr += '' + getProp(varname, type);
        //创建
        createStr += '\n' + getCreate(varname, id, type, parent, sArr);
        //布局
        let layout = getLayout(varname, sArr);
        if(layout != '')
        {
            let tmp = `        const ${varname} = this.${varname};\n`;
            let reg = new RegExp(`this.${varname}`,'g')
            layout = layout.replace(reg,`${varname}`);
            layoutStr += '\n' +tmp+ layout;
        }
        // layout != '' && (layoutStr += '\n'+layout);
        // layoutStr += '\n' + getLayout(varname, sArr);
    });

    return { createStr, propStr, layoutStr }
}

exports.parse = parse;