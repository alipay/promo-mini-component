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
    prizeName: '',
    flipAllCards3: false,
    flipAllCards6: false,
    flipAllCards9: false,
    isDrawing3: false,
    isDrawing6: false,
    isDrawing9: false,
    tipText3: '翻牌抽奖',
    tipText6: '翻牌抽奖',
    tipText9: '翻牌抽奖',
  },
  
  onFlipStart(x, muilt) {
    console.log('开始了，这个时候最好页面控制下 loading 状态，组件内不做控制');
    this.setData({
      [`tipText${x}`]: '正在抽奖...',
      [`isDrawing${x}`]: true,
    });
    // request
    setTimeout(() => {
      console.log('拿到结果，设置奖品信息');
      const prizeName = Math.random() > 0.5 ? '666元红包' : '未中奖';
      this.setData({
        prizeName,
        [`tipText${x}`]: prizeName,
        [`isDrawing${x}`]: false,
      });
      // do something
      if (!muilt) {
        setTimeout(() => {
          this.setData({
            [`flipAllCards${x}`]: true
          });
        }, 1000);
      }
    }, 1000);
  },

  onFlipStart3() {
    this.onFlipStart(3);
  },
  onFlipStart6() {
    this.onFlipStart(6);
  },
  onFlipStart9() {
    this.onFlipStart(9, true);
  },
});
