import { toast } from '../component/utils'

Page({
  data: {
    awardImg: '',
    awardName: '',
    tipText: '',
  },
  onStart() {
    toast('开始摇')
    this.setData({
      tipText: '正在抽奖...'
    });
    setTimeout(() => {
      this.setData({
        awardImg: 'https://gw.alicdn.com/tfs/TB1JsqGbHPpK1RjSZFFXXa5PpXa-289-298.png',
        awardName: '1等奖'
      })
    }, 2000);
  },
  onFinish() {
    toast('摇完啦')
    this.setData({
      tipText: `抽奖结果：${this.data.awardName}`
    });
  }
});
