// 获取应用实例
const app = getApp();

Page({
  data: {
    content: 'demo',
  },
  onLoad(options) {
    console.log('demo onLoad, options: ', options);
  },
  onReady() {
    console.log('demo onReady');
  },
  onShow() {
    console.log('demo onShow');
  },
  onHide() {
    console.log('demo onHide');
  },
  onUnload() {
    console.log('demo onUnload');
  },
  onFinish(){
    console.error('do something')
  }
});
