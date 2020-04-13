Component({
  data: {
    degValue: 0, // 旋转角度
    prizeWidth: 0, // 奖项背景图宽度计算值
    prizePaddingTop: 0, // 奖项上边距计算值
    itemTransformOrigin: '', // 奖项旋转原点计算值
  },
  props: {
    width: 300, // 画布大小，默认单位 px
    initDeg: 0, // 初始旋转角度
    rotTimes: 1, // 抽奖机会次数
    prizeList: [], // 奖品列表
    prizeName: '', // 获奖项名字
    prizeWidth: NaN, // 奖项宽度
    prizePaddingTop: NaN, // 奖项距离圆弧的内边距
    bgImg: 'https://gw.alipayobjects.com/zos/rmsportal/YIunNQVWkFRxUTaUNhOZ.png', // 背景图
    btnImg: 'https://gw.alipayobjects.com/zos/rmsportal/JHenAywYHZTLbbrnkIFN.png', // 按钮图
    onStart: () => {}, // 开始回调
    onFinish: () => {}, // 结束回调
    onTimesUp: () => {}, // 次数用尽的回调
  },
  didMount () {
    const widthNum = this._getNum(this.props.width);
    const widthUnit = this._getUnit(this.props.width);
    const prizeWidth = this.props.prizeWidth;
    const paddingTop = this.props.prizePaddingTop;
    this.setData({
      degValue: this.props.initDeg,
      itemTransformOrigin: `transform-origin:50% ${0.5 * widthNum}${widthUnit};`,
      prizeWidth: isNaN(prizeWidth) ? this._calculatePrizeWidth() : prizeWidth,
      prizePaddingTop: isNaN(paddingTop) ? this._calculatePrizePaddingTop() : paddingTop,
    });
    this.count = 6; // 奖品个数
    this.rotNum = 0; // 当前是第几次抽奖
    this.onRunning = false; // 是否正在抽奖
  },
  methods: {
    init () {},
    getIndexByName (name) {
      const list = this.props.prizeList;
      for (let i = 0; i < this.count; i ++) {
        if (list[i] && list[i].name === name) return i;
      }
      return -1;
    },
    start (e) {
      if (this.onRunning) return;
      if (this.rotNum >= this.props.rotTimes) {
        this.props.onTimesUp();
        return;
      };
      if (!this.props.prizeName) {
        throw new Error('请传入抽奖结果名称：prizeName');
      }
      const index = this.getIndexByName(this.props.prizeName);
      if (index === -1) {
        throw new Error(`抽奖结果名称与抽奖列表配置项不匹配，未找到名称为${this.props.prizeName}的奖项`);
      }
      this.rotNum += 1;
      this.onRunning = true;
      const degree = (index + (index + 1)) * (360 / (this.count * 2));
      const degValue = 360 * this.count * this.rotNum - degree;
      this.setData({degValue});
      this.props.onStart(this.props.prizeName, this.rotNum);
      setTimeout(() => {
        this.done();
      }, 6000);
    },
    done () {
      this.onRunning = false;
      this.props.onFinish(this.props.prizeName, this.rotNum);
    },
    _getNum (s) { // 获取像素选项数值
      return parseFloat(s);
    },
    _getUnit (s) { // 获取像素选项单位
      s += '';
      return (s.match(/[a-z]+$/) || [])[0] || 'px';
    },
    _calculatePrizeWidth () {
      // 等边三角形内接正方形边长: (4 - 2 * 根号3) * 边长
      const widthNum = this._getNum(this.props.width);
      const widthUnit = this._getUnit(this.props.width);
      return (4 - 2 * Math.sqrt(3)) * 0.5 * widthNum + widthUnit;
    },
    _calculatePrizePaddingTop () {
      // 等边三角形一边的中点离过该边两点的圆弧的距离: 边长 - 边长 * (根号3 / 2)
      const widthNum = this._getNum(this.props.width);
      const widthUnit = this._getUnit(this.props.width);
      return 0.5 * widthNum - 0.25 * widthNum * Math.sqrt(3) + widthUnit;
    }
  }
})
