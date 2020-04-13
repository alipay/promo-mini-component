App({
  onLaunch(options) {
    console.log('app onLaunch: options: ', options);
  },
  onShow() {
    console.log('app onShow');
  },
  onHide() {
    console.log('app onHide');
  },
  onError(msg) {
    console.log('app OnError: ', msg);
  },
  globalData: 'I am global data'
});
