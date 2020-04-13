const toast = function(msg, duration = 3000) {
  my.showToast({
    content: JSON.stringify(msg),
    duration,
  });
}
const createFlipAnimation = function (duration = 600) {
  const ani = my.createAnimation({
    duration,
    timeFunction: 'ease-in-out',
  });
  ani.rotate3d(0,1,0,180).step();
  return ani;
}

Component({
  data: {
    activeIndex: NaN,
    cardList: [],
  },
  props: {
    prizeList: [], // 奖项列表，
    prizeName: '', // 获奖项名称
    cardNum: 9, // 展示卡片数量，推荐长度为3、6、9
    isDrawing: true, // 是否允许点击
    flipAllCards: false, // 是否翻转所有未抽过的卡片
    cardHeight: 210,
    cardBgImg: 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png',
    unawardImg: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png', //未中奖图片
    onFlipStart: () => {}, // 开始的回调
  },
  didMount() {
    this.initCardList();
  },
  didUpdate (prevProps, prevData) {
    const { prizeName, prizeList, isDrawing, flipAllCards } = this.props;
    // if (!this.data.cardList.length) {
    //   this.initCardList();
    // }

    if (!isDrawing && prevProps.isDrawing) {
      // 奖品信息更新，说明抽奖结果返回了，需要判定是否中奖
      const prizes = prizeList.filter(item => item.name === prizeName);
      this.lotteryCallback(prizes[0]);
    }

    if (flipAllCards) {
      this.flipRestCards();
    }
  },
  methods: {
    initCardList() {
      const cardList = [];
      const { cardNum, cardBgImg, cardHeight } = this.props;
      for (let i = 0; i < parseInt(cardNum); i++) {
        cardList.push({
          imgStyle: `height:${cardHeight}rpx;`,
          disabled: false,
          icon: cardBgImg,
          animation: my.createAnimation({}).export()
        });
      }
      this.setData({ cardList });
    },
    onFlipStart(e) {
      if (this.props.isDrawing) return;

      const idx = e.currentTarget.dataset.idx;
      if (this.data.cardList[idx].disabled) return;

      this.setData({
        activeIndex: idx,
      });

      this.props.onFlipStart();
    },
    // 中奖回调，需要将当前卡片信息置为中奖，播放动画，有 prize 参数说明中奖，否则未中奖
    lotteryCallback(prize) {
      const { activeIndex, cardList } = this.data;

      // 翻转
      cardList[activeIndex].animation = createFlipAnimation().export();
      cardList[activeIndex].disabled = true;
      this.setData({ cardList });

      // 翻转到一半修改图片
      setTimeout(() => {
        if (prize && prize.icon) {
          cardList[activeIndex].icon = prize.icon;
        } else {
          cardList[activeIndex].icon = this.props.unawardImg;
        }
        cardList[activeIndex].imgStyle += "transform: rotateY(-180deg);";
        this.setData({ cardList });  
      }, 300);
    },
    flipRestCards() {
      const { cardList } = this.data;
      cardList.forEach((item, index) => {
        if (!item.disabled) {
          item.animation = createFlipAnimation().export();
        }
      });
      this.setData({ cardList });

      setTimeout(() => {
        cardList.forEach((item, index) => {
          if (!item.disabled) {
            const { icon } = this.props.prizeList[index] || {};
            item.icon = icon || this.props.unawardImg;
          }
          if (item.imgStyle.indexOf("transform: rotateY(-180deg);") < 0) {
            item.imgStyle += "transform: rotateY(-180deg);";
          }
          item.disabled = true;
        });
        this.setData({ cardList });
      }, 300);
    }
  }
})
