# 摇骰子 小程序组件

![](https://gw.alicdn.com/tfs/TB1tNrMdYvpK1RjSZPiXXbmwXXa-259-216.gif)

## Install

### tnpm

```dash
yarn add ant-mini-dice-roller
```

## Usage

### json

```json
{
  "usingComponents": {
    "diceroller": "ant-mini-dice-roller/es/component/index"
  }
}
```

### js

``` js
Page({
  data: {
    awardImg: '',
    awardName: '',
    tipText: '',
  },
  onStart() {
    toast('开始摇')
    this.setData({
      tipText: '正在抽奖...'
    });
    setTimeout(() => {
      this.setData({
        awardImg: 'https://gw.alicdn.com/tfs/TB1JsqGbHPpK1RjSZFFXXa5PpXa-289-298.png',
        awardName: '1等奖'
      })
    }, 2000);
  },
  onFinish() {
    toast('摇完啦')
    this.setData({
      tipText: `抽奖结果：${this.data.awardName}`
    });
  }
});
```
### xaml
```html
<view class="container">
  <diceroller
    clickMode="true"
    awardImg="{{awardImg}}"
    onStart="onStart"
    onFinish="onFinish"
  >
    <view slot="button">外部组件摇一摇按钮</view>
  </diceroller>
  <view class='tip-text'>{{tipText}}</view>
</view>
```

### API
属性 | 类型 | 默认值 | 含义 |
--- | --- | --- | ---
width | Number | 318 | 组件宽度(rpx)
height | Number | 300 | 组件高度(rpx)
background | String | #FFF | 背景色
rollTime | Number | 3000 | 摇骰子时间（毫秒）
rollImg | String | [查看](https://gw.alipayobjects.com/zos/rmsportal/cuSVBODjFpqiVMgnLiXK.png) | 摇奖时逐帧图片
initImg | String | [查看](https://gw.alicdn.com/tfs/TB1JsqGbHPpK1RjSZFFXXa5PpXa-289-298.png) | 初始化骰子图片
onStart | Func | - | 开始回调
onFinish | Func | - | 结束回调

