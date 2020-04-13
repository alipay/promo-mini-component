Component({
  data: {
    pr: 1,
    scraping: true, // 正在刮奖
    animationClass: ''
  },
  props: {
    id: 'scratch-canvas',
    width: 300, // 容器宽度 px
    height: 150, // 容器宽度 px
    tipText: '刮刮我，有惊喜', // 提示文字
    tipColor: '#aaa', // 提示文字颜色
    tipSize: 20, // 提示文字大小
    lineWidth: 25, // 橡皮檫粗细
    activePercent: 0.4, // 擦除一定比例区域后背景自动消失，值为小数，0-1
    autoFadeOut: true, // 是否开启背景自动消失
    coverColor: '#dbdbdb', // 背景颜色
    resultText: '谢谢参与', // 抽奖结果文字
    onFinish: () => {} // 抽奖结束回调，当擦除比例达到activePercent时触发
  },
  didMount () {
    // var toast = function(title) {
    //   my.showToast({
    //     type: 'success',
    //     content: title,
    //     duration: 1000,
    //   });
    // }
    // my.getSystemInfo({
    //   success: res => {
    //     // 根据rpx 宽高比计算出实际 px 宽高比
    //     const pr = res.screenWidth / 750;
    //     this.setData({
    //       pr,
    //     });
    //     // toast(`${res.pixelRatio}, screenWidth: ${res.screenWidth}, pr:${pr}`);
    //     this.ctx = my.createCanvasContext('scratch-canvas');
    //     this.draw(); // 刮刮卡容器初始化;
    //     this.area = pr * this.props.width * pr * this.props.height; // canvas 面积
    //     this.clearPercent = 0; // 被清除像素的所有选区占 canvas 面积的百分比
    //   }
    // })
    const pr = 1;
    this.ctx = my.createCanvasContext('scratch-canvas');
    this.draw(); // 刮刮卡容器初始化;
    this.area = pr * this.props.width * pr * this.props.height; // canvas 面积
    this.clearPercent = 0; // 被清除像素的所有选区占 canvas 面积的百分比
  },

  methods: {
    onTouchStart (e) {
      // 在真机上该事件没有changedTouches属性
      if (e.touches && e.touches[0]) {
        const point = e.touches[0];
        this.lastPoint = point;
      }
    },
    onTouchMove (e) {
      const point = (e.changedTouches || e.touches || [])[0];
      if (point) {
        this.refresh(point);
        this.lastPoint = point;
      }
    },
    onTouchEnd (e) {
      if (!this.data.scraping) return;
      const point = (e.changedTouches || e.touches || [])[0];
      
      if (!point) {
        // 没有拿到point直接完成
        this.onFinish();
        this.setData({ scraping: false });
        this.props.autoFadeOut && this.fadeOut();
      }

      this.lastPoint = null;
      if (this.clearPercent > this.props.activePercent) {
        this.onFinish();
        this.setData({ scraping: false });
        this.props.autoFadeOut && this.fadeOut();
      }
    },
    draw () {
      const ctx = this.ctx;
      const props = this.props;
      const pr = this.data.pr;
      ctx.fillStyle = props.coverColor;
      ctx.fillRect(0, 0, props.width * pr, props.height * pr);
      // 绘制logo背景图
      if (props.ctxLogoUrl) {
        ctx.drawImage(props.ctxLogoUrl, 0, 0, props.width * pr, props.height * pr);
      }
      // 绘制提示文字
      // 设置字体样式
      ctx.font = props.tipSize + 'px Courier New';
      // 设置字体颜色
      ctx.fillStyle = props.tipColor;
      // 绘制文字垂直居中
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(props.tipText, props.width * pr / 2, props.height * pr / 2);
      ctx.strokeStyle = 'white';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = props.lineWidth;
      ctx.draw();
    },
    refresh (point = {}) {
      /*
        小程序 canvas 不支持 globalCompositeOperation 属性
        this.ctx.globalCompositeOperation = "destination-out"; // 无效
        所以要很 hack 的根据屏幕滑动始末两端点连成粗线条选区，再自己实现清除选区像素
      */
      const pr = this.data.pr;
      const ctx = this.ctx;
      const props = this.props;
      const r = props.lineWidth / 2;
      const x1 = this.lastPoint.x;
      const y1 = this.lastPoint.y;
      const x2 = point.x;
      const y2 = point.y;

      // (x1, y1), (x2, y2)分别为线条起始和结尾的两个端点，即粗线条两端点圆弧的圆心 矩形长为手指移动的线条长度，高为线条宽度lineWidth
      // 获取两个点之间的剪辑区域四个端点,即矩形边框顶点(x3, y3)..(x6, y6)
      const asin = r * Math.sin(Math.atan((y2 - y1) / (x2 - x1)));
      const acos = r * Math.cos(Math.atan((y2 - y1) / (x2 - x1)));
      const x3 = x1 + asin;
      const y3 = y1 - acos;
      const x4 = x1 - asin;
      const y4 = y1 + acos;
      const x5 = x2 + asin;
      const y5 = y2 - acos;
      const x6 = x2 - asin;
      const y6 = y2 + acos;

      // 保证线条的连贯，所以在矩形两端画圆
      ctx.save();
      ctx.beginPath();
      ctx.arc(x1, y1, r, 0, 2 * Math.PI);
      ctx.arc(x2, y2, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.clearRect(0, 0, props.width * pr, props.height * pr);
      ctx.restore();

      // 清除矩形剪辑区域里的像素
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x3, y3);
      ctx.lineTo(x5, y5);
      ctx.lineTo(x6, y6);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.clip();
      ctx.clearRect(0, 0, props.width * pr, props.height * pr);
      ctx.restore();

      // 清除线条像素方案2
      // 在小程序内当滑动很快时会导致页面渲染崩溃白屏
      // this._clearCircle(point, r);
      // if (this.lastPoint) {
      //     let posX = point.x - this.lastPoint.x;
      //     let posY = point.y - this.lastPoint.y;
      //     let posXY = Math.abs(posX) + Math.abs(posY);
      //     while(posXY > 6) {
      //         Math.abs(posX) > 3 && (posX += (posX < 0 ? 3 : -3));
      //         Math.abs(posY) > 3 && (posY += (posY < 0 ? 3 : -3));
      //         this._clearCircle({x: point.x - posX, y: point.y - posY}, r);
      //         console.log(this.lastPoint, point, {x: point.x - posX, y: point.y - posY}, posX, posY)
      //         posXY = Math.abs(posX) + Math.abs(posY);
      //     }
      // }
      ctx.draw(true);
      this.calculateClearPercent(x1, y1, x2, y2);
    },
    // BUG: 由于getImageData接口限制，无法真正获取被刮开的区域占比（当重复刮空白区域时重复计算，目前无法判断）
    calculateClearPercent (x1, y1, x2, y2) {
      const lx = x2 - x1;
      const ly = y2 - y1;
      const l = Math.sqrt(lx * lx + ly * ly);
      this.clearPercent += (l * this.props.lineWidth) / this.area;
    },
    fadeOut () {
      this.setData({
        animationClass: 'fade-out',
      });
    },
    onFinish () {
      this.props.onFinish();
    }
    // _clearCircle(point, r) {
    //     const r2 = r * r;
    //     for (let x = 0; x <= r; x++) {
    //         for (let y =0; y <= r; y++) {
    //             if (x*x + y*y <= r2) {
    //                 this.ctx.clearRect(point.x + x, point.y + y, 1, 1);
    //                 this.ctx.clearRect(point.x - x, point.y + y, 1, 1);
    //                 this.ctx.clearRect(point.x + x, point.y - y, 1, 1);
    //                 this.ctx.clearRect(point.x - x, point.y - y, 1, 1);
    //             } else {
    //                 break; // 终止内层循环
    //             }
    //         }
    //     }
    // }
  }
})
