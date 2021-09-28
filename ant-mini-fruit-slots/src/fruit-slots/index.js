Component({
  data: {
    activeOrder: [0, 1, 2, 4, 7, 6, 5, 3], // 九宫格除按钮外的8个格子自左上角顺时针的下标顺序
    activeIndex: NaN,
    itemWidth: 0,
    isRolling: false
  },
  props: {
    width: 700, // 组件宽度，单位 rpx
    margin: 20, // 奖项之间的外边距，单位 rpx
    prizeList: [], // 奖项列表，个数限定为8
    prizeName: '', // 获奖项名称
    rollTimes: 3, // 转动圈数
    mode: 'pre', // 抽奖模式：pre(默认) | realtime
    currentIndex: 0, // 转动开始的下标
    speed: 100, // 转动速度, 单位 ms
    class: '', // 自定义类名
    disabled: false, // 按钮是否可点击
    onStart: () => {}, // 开始的回调
    onFinish: () => {} // 结束的回调
  },
  didMount() {
    this.prizeLength = 8;
    // 必须要取整，否则部分机型下有适配问题
    this.setData({
      itemWidth: parseInt((this.props.width - 4 * this.props.margin) / 3)
    })
  },
  didUpdate(prevProps) {
    const { mode, prizeName } = this.props;
    if (mode === 'realtime' && prizeName && prevProps.prizeName !== prizeName) {
      const prizeIndex = this.findPrizeIndex(prizeName);
      if (prizeIndex === -1) {
        console.error('请传入正确的获奖项name，其值必须存在于 prizeList name 字段中');
        return;
      }
      // 总转动步数 = 默认圈数 x 奖品个数 + 结束位置索引 + 当前位置到一圈结束还剩下的步数
      const activeIndex = this.currentStep % this.prizeLength;
      this.totalSteps = 1 * this.prizeLength + this.currentStep + (this.prizeLength - activeIndex) + prizeIndex;
    }
  },
  methods: {
    next(activeIndex) {
      activeIndex = activeIndex % this.prizeLength;
      this.setData({activeIndex: this.data.activeOrder[activeIndex]});
      if (this.currentStep === this.totalSteps) {
        this.done(activeIndex);
        return;
      }
      this.currentStep += 1;
      setTimeout(() => {
        this.next(++activeIndex);
      }, this.speedCtl());
    },
    /**
      模拟速度变化，分为四档
      当走过格子数 < 总步数 - 2圈格子数时，速度为speed
      以此线性递增
    */
    speedCtl() {
      const steps = this.totalSteps;
      const size = this.prizeLength;
      const currentStep = this.currentStep;
      if (currentStep < (steps - size * 2)) {
        return this.props.speed;
      } else if ((steps - size * 2) <= currentStep && currentStep <= (steps - size)) {
        return this.props.speed * 2;
      } else if (steps - currentStep > 3) {
        return this.props.speed * 3;
      } else {
        return this.props.speed * 4;
      }
    },
    /**
      通过名称获取奖品项在顺时针格子中对应的下标
      未找到返回-1
    */
    findPrizeIndex(name) {
      const prizeList = this.props.prizeList;
      const order = this.data.activeOrder;
      for (let i = 0; i < this.prizeLength; i++) {
        if (prizeList[order[i]].name === name) {
          return i;
        }
      }
      return -1;
    },
    start() {
      this.currentStep = 0;
      const { disabled, prizeList, currentIndex, prizeName, mode } = this.props;
      if (disabled || this.data.isRolling) return;
      if (prizeList.length !== 8) {
        console.error('奖品项列表 prizeList 长度不为8');
      }
      const activeIndex = +currentIndex || 0;
      if (mode === 'realtime') {
        this.totalSteps = Infinity;
      } else {
        // 奖品项下标
        const prizeIndex = this.findPrizeIndex(prizeName);
        if (prizeIndex === -1) {
          console.error('请传入正确的获奖项name，其值必须存在于 prizeList name 字段中');
        }
        // 总转动步数 = 默认圈数 x 奖品个数 + 结束位置索引 + 当前位置到一圈结束还剩下的步数
        this.totalSteps = this.props.rollTimes * this.prizeLength + prizeIndex + (this.prizeLength - activeIndex);
      }
      this.setData({isRolling: true});
      this.next(activeIndex);
      this.props.onStart();
    },
    done(activeIndex) {
      // setTimeout防止抽奖结束后父组件设置disabled=true的过程中用户马上再次点击抽奖 此时 disabled 和 isRolling
      // 状态还没来得及更新，start 函数可能被执行
      setTimeout(() => {
        this.setData({isRolling: false});
      }, 50);
      this.props.onFinish(activeIndex, this.props.prizeName);
    }
  }
})
