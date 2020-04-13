Page({
  data: {
    prizeList: [
      {
        name: 'H&M100元优惠券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/nIQUKeYBbJWliGJVhVmx.png'
      }, {
        name: '2元话费券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/HkrVjjjuxZPUMCUbPazb.png'
      }, {
        name: '45元飞猪出行券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cDctUxwBLPCszQHRapYV.png'
      }, {
        name: 'H&M10元优惠券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/FAmIWZAWpUwlRFKqQDLz.png'
      }, {
        name: '2元流量券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cuGomeXzMyeeZMjvVjBj.png'
      }, {
        name: '未中奖',
        img: 'https://zos.alipayobjects.com/rmsportal/dwhgPyWAcXuvJAWlSSgU.png'
      }
    ],
    prizeName: '2元话费券',
    totalTimes: 2,
    curTimes: 0,
    result: '',
  },
  onStart (name, times) {
    console.log('onStart', name, '第' + times + '次机会');
    this.setData({
      result: `第${times}次抽奖中，请稍候...`,
      curTimes: times++
    })
  },
  onFinish (name, times) {
    console.log('onFinish', name);
    this.setData({
      result: name === '未中奖' ? '很遗憾，差点就中奖了' : `恭喜你，获得${name}`,
      prizeName: this.data.prizeList[Math.floor(Math.random() * 6)].name,
    })
  },
  onTimesUp () {
    this.setData({
      result: `没次数啦`,
    })
  }
});
