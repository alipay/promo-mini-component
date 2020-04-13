Page({
  data: {
    disabled: false,
    times: 0
  },
  onStart(index) {
    console.log('开始砸金蛋', index);
    this.setData({
      times: ++this.data.times,
    })
  },
  onFinish(index) {
    console.log('砸金蛋结束', index);
    if (this.data.times >= 3) {
      this.setData({
        disabled: true,
      });
    }
  }
});
