namespace ys {
    class ImageHTML {

        public close(): void {
            var img = this.img;
            if (img && img.parentNode) {
                img.parentNode.removeChild(img);
                this.img = null;
            }
        }

        public img: HTMLImageElement;
        constructor() {
            var myImg: HTMLImageElement = document.createElement("img");
            myImg.style.position = "absolute";
            this.img = myImg;
            //阻止滑动
            myImg.ontouchmove = function (e) {
                e.preventDefault && e.preventDefault();
                e.returnValue = false;
                e.stopPropagation && e.stopPropagation();
            }
        }

        /**
         * 常用来实现：二维码长按识别，图片长按保持。只兼容固定宽和固定高，两种适配模式。
         * @url 图片的地址或者base64数据
         * @x 参考H5,x坐标
         * @y 参考H5,y坐标
         * @imgW 参考H5,图片的宽
         * @imgH 参考H5,图片的高
         */
        public show(url: string, x: number, y: number, imgW: number, imgH: number, alpha: number = 0): void {
            const top = y;
            const left = x;
            var scale = window.innerWidth / stageW;
            if (stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                scale = window.innerHeight / stageH;
            }
            var img = this.img;
            img.style.width = imgW * scale + "px";
            img.style.height = imgH * scale + "px";
            img.style.top = top * scale + "px";
            img.style.left = left * scale + "px";
            img.style.opacity = "" + alpha;

            img.src = url;
            document.body.appendChild(img);
        }

    }

}
