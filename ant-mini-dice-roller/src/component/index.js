import { watchPhoneShake, callPhoneVibrate, toast } from './utils'

Component({
  data: {
    rollIndex: 0,
    rollSize: 4,
    isRolling: false
  },
  props: {
    clickMode: false, // 默认摇一摇触发，可以修改为点击模式
    width: 318, // rollImg 宽度
    height: 300, // rollImg 单个元素高度
    background: '#FFF',
    rollTime: 3000, // ms
    initImg: 'https://gw.alicdn.com/tfs/TB1JsqGbHPpK1RjSZFFXXa5PpXa-289-298.png',
    awardImg: '',
    rollImg: 'https://gw.alipayobjects.com/zos/rmsportal/cuSVBODjFpqiVMgnLiXK.png',
    onStart: () => {}, // 开始的回调
    onFinish: () => {} // 结束的回调
  },
  didMount() {
    this.ctx = my.createCanvasContext('canvas');
    const { rollTime, initImg, clickMode } = this.props;
    this.drawImage(initImg);
    if (!clickMode) {
      watchPhoneShake(() => {
        this.run();
        setTimeout(() => {
          this.stop();
        }, rollTime);
      });
    }
  },
  methods: {
    onStart() {
      if (this.data.isRolling) return;

      const { onStart, clickMode, rollTime } = this.props;
      if (onStart) {
        onStart();
      }
      if (clickMode) {
        this.run();
        setTimeout(() => {
          this.stop();
        }, rollTime);
      } else {
        watchPhoneShake(() => {
          this.run();
          setTimeout(() => {
            this.stop();
          }, rollTime);
        });
      }
    },
    run() {
      this.setData({
        isRolling: true
      });
      this.interval = setInterval(this.draw.bind(this), 17);
    },
    stop() {
      clearInterval(this.interval);
      setTimeout(() => {
        this.drawImage(this.props.awardImg);
        this.setData({
          isRolling: false
        });
        if (typeof this.props.onFinish) {
          this.props.onFinish();
        }
      }, 17);
    },
    drawImage(img) {
      if (!img) return;

      const { width, height, rollImg, background } = this.props;
      const { rollIndex, rollSize } = this.data;
      const ctx = this.ctx;
      ctx.setFillStyle(background);
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
      ctx.draw();
    },
    draw() {
      const { width, height, rollImg, background } = this.props;
      const { rollIndex, rollSize } = this.data;
      const ctx = this.ctx;
      ctx.setFillStyle(background);
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(rollImg, 0, height * rollIndex, width, height, 0, 0, width, height);
      ctx.draw();
      this.setData({
        rollIndex: rollIndex >= rollSize ? 0 : rollIndex + 1
      })
    },
  }
})
