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
      'name': '1元红包-上',
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
      'name': '1元红包-下',
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
    prizeName2: '',
    disabled: false,
    currentIndex: 5,
    tipText: '',
    tipText2: '',
  },
  onStart() {
    this.setData({
      tipText: '正在抽奖...'
    });
  },
  onFinish(index, name) {
    this.setData({
      tipText: `抽奖结果：${name}`
    });
  },
  onStart2() {
    this.setData({
      tipText2: '正在抽奖...',
      prizeName2: '', // 由于一开始不确定奖品，需要置为空。
    });
    // 模拟请求，延迟中奖
    setTimeout(() => {
      this.setData({
        prizeName2: '3元红包',
      });
    }, 3000);
  },
  onFinish2(index, name) {
    this.setData({
      tipText2: `抽奖结果：${name}`,
    });
  }
});
