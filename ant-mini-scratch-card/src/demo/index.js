// 获取应用实例
const app = getApp();

Page({
  data: {
    content: 'demo',
    result: ''
  },
  onLoad(options) {
    setTimeout(() => {
      this.setData({
        result: '很遗憾，差点就中奖了'
      });
    }, 1000);
  },
  onFinish() {
    console.log('刮奖结束了');
  }
});
