Component({
  data: {
    list: [],
    hammerMace: false,
    isSmashing: false,
    activeIndex: -1,
    hammerPosX: 0,
    hammerPosY: 0,
    // 以下数字标识金蛋状态
    STATE_BROKEN: 0, // 已经砸过
    STATE_STILL: 1, // 静止不动
    STATE_JUMPING: 2, // 正在跳动
    STATE_SMASHING: 3 // 正在被砸
  },
  props: {
    eggsCount: 9, // 金蛋个数
    eggCol: 3, // 金蛋列数
    eggWidth: 200, // 金蛋大小，单位 rpx
    hammerWidth: 100, // 锤子大小， 单位 rpx
    eggMarginTop: 20, // 金蛋上边距
    hammerOriginX: -20, // 锤子原点距离组件右上顶点的偏移 X，左正右负，单位 rpx
    hammerOriginY: 0, // 锤子原点距离组件右上顶点的偏移 Y，下正上负，单位 rpx
    jumpingInterval: 600, // 金蛋跳动间隔，单位 ms
    smashingDuration: 1500, // 砸金蛋持续时间，单位 ms
    className: '', // 自定义类名
    disabled: false, // 是否进行游戏
    onStart: () => {}, // 砸金蛋开始的回调
    onFinish: () => {}, // 砸金蛋结束的回调
    hammerIcon: 'https://gw.alipayobjects.com/zos/rmsportal/XgogyVJXSBVXPxbTOFDK.png', // 锤子图标
    eggIcon: 'https://gw.alipayobjects.com/zos/rmsportal/TaqyxvdUFYgIwFxMuaRL.png', // 金蛋图标
    jumpIcon: 'https://gw.alipayobjects.com/zos/rmsportal/mTqmImAsoDZNmkdvuooP.png', // 金蛋跳动的图标
    redBagIcon: 'https://gw.alipayobjects.com/zos/rmsportal/OgfiOSzclCukkGfwbaGw.png', // 金蛋被砸的图标
    smashedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/bItnDJuMaqJPBeKfhkMG.png' // 金蛋砸碎的图标
  },
  didMount () {
    const list = [];
    for (let i = 0; i < this.props.eggsCount; i++) {
      list.push(1);
    }
    this.setData({ list: list });
    this.run();
  },
  didUpdate (prevProps) {
    if (this.props.disabled) {
      this.stop();
    } else if (prevProps.disabled) {
      this.run();
    }
  },

  methods: {
    run () {
      if (this.props.disabled) return;
      if (!this.hammerTimer) {
        this.eggsTimer = this.jumping(this.props.jumpingInterval); // 金蛋跳动
        this.hammerTimer = this.maceAnim(400);
      }
    },
    jumping (ts) {
      // 金蛋跳动
      return setInterval(() => {
        const list = this.data.list;
        const aIndex = this.data.activeIndex; // 当前跳起的金蛋下标 activeIndex
        let cIndex = (aIndex + 1) % list.length; // 金蛋下标 currentIndex
        // 获取下一个没有被砸的金蛋的下标
        for (let i = 0; i < list.length; i++) {
          if (list[cIndex] === 1) {
            list[cIndex] = this.data.STATE_JUMPING;
            list[aIndex] === this.data.STATE_JUMPING && (list[aIndex] = this.data.STATE_STILL);
            this.setData({
              list: list,
              activeIndex: cIndex
            });
            break;
          }
          cIndex = (cIndex + 1) % list.length;
        }
      }, ts);
    },
    onHiting (e) {
      !this.props.disabled && this.start();
    },
    maceMoving () {
      // 锤子移动到金蛋位置
      // 计算锤子移动的目标位置
      const index = this.data.activeIndex;
      const col = +this.props.eggCol;
      const eggWidth = +this.props.eggWidth;
      const hammerWidth = +this.props.hammerWidth;
      const marginTop = +this.props.eggMarginTop;

      const offsetX = 0.3 * (eggWidth - hammerWidth);
      const offsetY = 0.3 * (eggWidth - hammerWidth);
      const x = (col - 1 - index % col) * eggWidth + offsetX;
      const y = Math.floor(index / col) * (eggWidth + marginTop) + offsetY;
      this.setData({
        hammerPosX: x,
        hammerPosY: y
      });
    },
    hammerHoming () {
      // 锤子归位
      this.setData({
        hammerPosX: this.props.hammerOriginX,
        hammerPosY: this.props.hammerOriginY
      });
    },
    maceAnim (ts) {
      // 锤子动画
      return setInterval(() => {
        this.setData({
          hammerMace: !this.data.hammerMace
        });
      }, ts);
    },
    smashing () {
      // 砸金蛋过程
      var list = this.data.list;
      var index = this.data.activeIndex;
      list[index] = this.data.STATE_SMASHING;
      // 设置红包金蛋背景
      this.setData({
        list: list
      });
    },
    brocken () {
      // 金蛋砸碎
      var index = this.data.activeIndex;
      this.data.list[index] = this.data.STATE_BROKEN;
      this.setData({
        list: this.data.list
      });
    },
    clear () {
      clearInterval(this.eggsTimer);
      clearInterval(this.hammerTimer);
      this.hammerTimer = this.eggsTimer = null;
    },
    stop () {
      // 中止游戏
      this.clear();
    },
    start () {
      // 开始砸蛋
      this.clear();
      this.maceMoving();
      this.smashing();
      this.hammerTimer = this.maceAnim(80);
      this.setData({
        isSmashing: true
      });
      setTimeout(() => {
        this.done();
      }, this.props.smashingDuration);
      this.props.onStart();
    },
    done () {
      // 结束砸蛋
      this.brocken();
      this.clear();
      this.hammerHoming();
      this.setData({
        isSmashing: false
      });
      setTimeout(() => {
        this.run();
      }, 500);
      this.props.onFinish();
    }
  }
});
