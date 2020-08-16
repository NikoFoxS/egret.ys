/** 对core里面GG.ts进行扩展 */
namespace GG {

	export function newTextInput(w, h, layer?: egret.DisplayObjectContainer): ys.TextInput {
		const input = new ys.TextInput(w, h);
		layer && layer.addChild(input);
		return input;
	}

	export function newLabel(layer?: egret.DisplayObjectContainer): ys.Label {
		const label = new ys.Label();
		layer && layer.addChild(label);
		return label;
	}

	export function newImage(layer?: egret.DisplayObjectContainer): ys.Image {
		const img = new ys.Image();
		layer && layer.addChild(img);
		return img;
	}

	export function newButton(res, layer?: egret.DisplayObjectContainer): ys.Button {
		const btn = new ys.Button(res);
		layer && layer.addChild(btn);
		return btn;
	}

	export function newButtonMusic(res1, res2, layer?: egret.DisplayObjectContainer): ys.ButtonMusic {
		const music = new ys.ButtonMusic(res1, res2);
		layer && layer.addChild(music);
		return music;
	}

	/**弱提示 */
	export function showToast(msg, y = stageH * 0.6, icon = '', block = false) {
		const t = ys.Tips.showToast(msg, stageHalfW, y, icon);
		if (block) {
			GG.popUp(t);
		} else {
			stage.addChild(t);
		}

	}
	/**模态提示 */
	export function showModal(msg, confirmTxt = '确定', cancelTxt = '取消', size = 40): ys.Modal {
		const m = ys.Tips.showModal(msg, confirmTxt, cancelTxt, size);
		GG.layoutCenter(m);
		GG.popUp(m);
		return m;
	}

	export function showLoading(txt = '加载中', step = true) {
		return ys.Tips.showLoading(txt, step)
	}

	export function hideLoading() {
		ys.Tips.hideLoading();
	}
}