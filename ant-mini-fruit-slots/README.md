# ant-mini-fruit-slots
  支付宝小程序：九宫格转盘抽奖组件

## Install

### tnpm

```dash
yarn add ant-mini-fruit-slots
```
## Usage

### json

```json
{
  "usingComponents": {
    "fruit-slots": "ant-mini-fruit-slots/es/fruit-slots/index"
  }
}
```

### js

``` js
Page({
  data: {
    prizeList: [ // prizeList 长度必须为8，其中须包含奖项名字 name 和图标地址 icon
      {
        'name': '谢谢参与',
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
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '1元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
        'name': '谢谢参与',
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
    this.setData({
      tipText: '正在抽奖...'
    });
  },
  onFinish(index, name) {
    this.setData({
      currentIndex: Math.floor(Math.random() * 8),
      tipText: `抽奖结果：${name}`
    });
  }
});
```
### xaml
```html
<view class="container">
  <fruit-slots
    prizeList="{{prizeList}}"
    prizeName="{{prizeName}}"
    disabled="{{disabled}}"
    currentIndex="{{currentIndex}}"
    onStart="onStart"
    onFinish="onFinish"
  />
  <view class='tip-text'>{{tipText}}</view>
</view>
```

### API
属性 | 类型 | 默认值 | 含义 |
--- | --- | --- | ---
width | Number | 700 | 组件宽度【选填】，单位 `rpx`
margin | Number | 20 | 格子间的边距【选填】，单位`rpx`
prizeList | Array | [] | 奖项列表【必填】，长度必须为`8`，须包含 `name` 和 `icon` 字段
prizeName | String | '' | 抽奖结果的奖品 `name`【必填】，其值必须位于 `prizeList` 中
rollTimes | Number | 3 | 转动圈数【选填】
currentIndex | Number | 0 | 转动开始的格子下标【选填】
speed | Number | 100 | 转动速度【选填】，单位 `ms`
mode | String | 'pre' | 抽奖模式，pre 或者 realtime 模式
class | String | '' | 自定义类名【选填】
disabled | Boolean | false | 抽奖按钮是否可点击【选填】
onStart | Function | () => {} | 转动开始的回调【选填】
onFinish | Function | (index, name) => {} | 转动结束的回调【选填】, @params(index: 奖品所在格子下标，name: 奖品名称)

### 关于抽奖模式 mode 说明
默认情况下 mode = 'pre'，即向服务端请求拿到抽奖结果后，将 prizeName 传给组件，然后组件开始执行动画抽奖效果。

但是如果抽奖请求时间较长的情况下，用户就可能点击抽奖后要等待一段时间才能看到抽奖动画，体验不太好，因此新增了 realtime 实时模式。
示例代码：
### xaml
```html
<fruit-slots
  mode="realtime"
  prizeList="{{prizeList}}"
  prizeName="{{prizeName}}"
  onStart="onStart"
  onFinish="onFinish"
/>
```

``` js
Page({
  data: {
    prizeList: [ // prizeList 长度必须为8，其中须包含奖项名字 name 和图标地址 icon
      {
        'name': '谢谢参与',
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
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '1元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '5元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png'
      }
    ],
    prizeName: '',
  },
  onStart() {
    // 注意，点击开始抽奖时需要将 prizeName 置为空，等待请求拿到结果之后再重新赋值，否则多次抽奖会存在问题
    this.setData({
      prizeName: '',
    });
    // 模拟请求，延迟中奖
    setTimeout(() => {
      this.setData({
        prizeName: Math.random() > 0.4 ? '3元红包' : '谢谢参与',
      });
    }, 3000);
  },
  onFinish(index, name) {
    console.log('抽奖结果：', index, name);
  }
});
```
实际开发中推荐使用 realtime 模式。

### 关于格子下标说明
> 组件中格子自左上角顺时针开始，围绕中间按钮，下标从0开始递增到7

> 当需要组件从左下角的格子为初始位置开始转动，只需要设置 `currentIndex = 6`即可

<img src="https://img.alicdn.com/tfs/TB1RsAEq.OWBKNjSZKzXXXfWFXa-718-720.png" width="250px; margin: auto;">

### 组件效果

![](https://gw.alipayobjects.com/zos/rmsportal/eTajnIFhAnYArKvcbzWM.gif)
