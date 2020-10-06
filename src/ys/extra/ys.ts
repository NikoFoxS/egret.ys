/** 对core里面ys.ts进行扩展 */
namespace ys {

	/**弱提示 */
	export function showToast(msg, y , icon = '', block = false) {
		// const t = ys.Tips.showToast(msg, stageHalfW, y, icon);
		// if (block) {
		// 	ys.popUp(t);
		// } else {
		// 	ys.Context.STAGE.addChild(t);
		// }

	}
	
	/**模态提示 */
	export function showModal(msg, confirmTxt = '确定', cancelTxt = '取消', size = 40): ys.Modal {
		const m = ys.Tips.showModal(msg, confirmTxt, cancelTxt, size);
		ys.layoutCenter(m);
		ys.popUp(m);
		return m;
	}

	export function showLoading(txt = '加载中', step = true) {
		return ys.Tips.showLoading(txt, step)
	}

	export function hideLoading() {
		ys.Tips.hideLoading();
	}
}