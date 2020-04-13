Page({
  data: {
    prizeList: [
      {
      'name': '谢谢参与1',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
      'name': '666元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/nxpXbcNBOmbeIOVCUsuS.png'
      },
      {
      'name': '1元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
      'name': '3元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/tyMAYvTdjRFOVxqWVhsj.png'
      },
      {
      'name': '谢谢参与2',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
      'name': '1元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
      'name': '谢谢参与3',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
      'name': '5元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png'
      }
    ],
    prizeName: '5元红包',
    disabled: false,
    currentIndex: 4,
    tipText: '',
  },
  onStart() {
    console.log('开始了');
    this.setData({
      tipText: '正在抽奖...'
    });
  },
  onFinish(index, name) {
    console.log('结束了', index);
    // this.setData({
    //   disabled: true
    // });
    this.setData({
      currentIndex: Math.floor(Math.random() * 8),
      tipText: `抽奖结果：${name}`
    });
  }
});
