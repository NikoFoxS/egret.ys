module ui {
	export class DomRule extends ui.DomPopUp{
		public constructor() {
			super();

			let close = this.addClose('resource/close.png',750*0.5,ys.Context.stageH - 200,76,76);

			let bg = new ys.DomDiv();
			bg.set(0,0,600,740);
			bg.el.style.borderRadius = bg.getDomPx(20);// `${ys.DOM.bili*20}px`;
			bg.el.style.backgroundColor = '#fff';
			bg.centerX(0);
			bg.centerY(0);

			let div = new ys.DomDiv('relative');
			div.set(0,0,600-40,700-40);
			div.el.style.margin = bg.getDomPx(20);//`${ys.DOM.bili*20}px`;
			bg.el.appendChild(div.el);

			this.el.appendChild(bg.el);
			document.body.appendChild(this.el);
			

			let rule = `
			<font color="#f00">阿里星际拍卖行活动规则</font><br>

星际拍卖行系阿里拍卖频道为实现对用户拍卖的心智教育，打造线上虚拟竞拍互动。收获水晶兑换更多权益。[活动规则不用介绍项目背景吧~]

一、参与条件
活动参与用户须为淘宝注册用户，且用户的淘宝账号需绑定支付宝账号并通过实名认证及绑定有效手机号码。

二、活动玩法
活动期间，用户进入手机淘宝访问阿里拍卖频道进入星际拍卖行互动页面，根据页面指示通过围观拍卖领取星际水晶(下文简称“水晶”)。同时通过完成指定任务，玩打地鼠游戏获取频道水晶。当水晶达到指定值，可兑换定额红包和更多好礼。[这里面没有提及参与拍卖也可以收取水晶，需要·说清楚，]

三、日常玩法说明
1、围观拍卖收水晶
1)每天将于（10点、12点、19点、22点）成交4个拍品。用户于成交前进入互动，围观拍卖，拍品成交后领取水晶。
2)用户可随意切换拍品类目，选择惊喜类目成交后，收益水晶翻倍。[并说明每天惊喜类目都不一样，需要用户自己手动更换。 每场拍卖成交前10s无法更换拍品。
还要说明普通拍品成交一个获得多少水晶，惊喜的是多少水晶]
3)每日有神秘[这个神秘用户的说法，感觉又多了一个概念，而且也没有神秘感觉~]用户奇袭，点击收取额外水晶。
4)每天未领取的水晶将在第二天0：00自动失效（失效后不可再领取）。
2、做任务赚水晶
用户可通过完成签到、浏览等任务方式收集水晶，具体任务方式可点击互动界面中的“做任务”查看。每种任务方式每日可完成的任务数和能赚取的水晶数有限制,具体获得的水晶数值以页面说明和实际到账为准。[既然是规则，还是要把次数和对应的水晶也在这里说清楚]
3、水晶兑换额定红包、各种好礼
1）当互动获得水晶满足兑换门槛时，用户可用水晶兑换额定红包，具体以线上展示为准。 2）同时，用户可用水晶兑换其他好礼，包括但不限于：实物商品券、抽奖次数等。

四、奖品发放及使用规则
用户获得红包/券将于24小时内容发放至淘宝账户，用户可通过“手机淘宝-我的淘宝-红包卡券-红包”或“手机天猫-我-红包卡券-红包”查看。活动页面仅展示当天获得的红包情况。
1.红包/券有效期为自用户获得之时起120小时内有效，逾期未用将失效。[这个地方还需要再跟阿里确认下。具体我们目前也不知道是多久失效]
2.红包/券不能提现、不得转赠他人、不得为他人付款，仅在阿里拍卖购买实物商品使用。
3.红包/券仅可用于抵扣商品(含税费)及运费金额，不支持抵扣运费险以及服务费。
4.使用红包的订单若发生退款，可退金额及红包可退面额以消费者退款页面的信息为准
退回后的红包在有效期内仍可使用且使用条件不变，逾期失效。

五、其他注意事项
1.在活动期间，如果用户存在违规行为（包括但不限于恶意套现、机器作弊、刷奖品），主办方阿里拍卖将取消用户的中奖资格，不退回水晶，并有权撤销相关违规交易、回收奖品，同时依照相关规则进行处罚。
2.如果岀现不可抗力或情势变更的情况(包括但不限于重大灾害事件、活动受到政府机关指令需要停止举办或者调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的)则主办方阿里拍卖可以主张免责。
3.阿里拍卖可以根据活动的实际情况对活动规则进行变动或者调整，相关变动或调整将公布在活动页面上。
4.我国部分地区,以及部分国家的法律规定对参与和举办以随机性的方法决定用户可能获得奖励的营销活动(例如：抽奖、抢红包、抢特定优惠秒杀商品等)有限制性规定,故此类营销活动只限于此类地区以外以及此类国家外的消费者参与。阿里拍卖提醒居住于中国香港、澳门、台湾等地区,以及其他受限制国家的消费者(包括但不限于新加坡、马来西亚等地消费者)请勿参与此类营销活动。
			
			`

			div.el.style.overflow = 'auto';
			// div.el.style.margin = '10px';
			// div.el.style.backgroundSize = "50px"
			// div.el.style.borderRadius = '20px';
			// div.el.style.backgroundColor = "#ffffff"
			div.el.innerHTML = rule;
		}
	}
}