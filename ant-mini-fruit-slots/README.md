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
class | String | '' | 自定义类名【选填】
disabled | Boolean | false | 抽奖按钮是否可点击【选填】
onStart | Function | () => {} | 转动开始的回调【选填】
onFinish | Function | (index, name) => {} | 转动结束的回调【选填】, @params(index: 奖品所在格子下标，name: 奖品名称)

### 关于格子下标说明
> 组件中格子自左上角顺时针开始，围绕中间按钮，下标从0开始递增到7

> 当需要组件从左下角的格子为初始位置开始转动，只需要设置 `currentIndex = 6`即可

<img src="https://img.alicdn.com/tfs/TB1RsAEq.OWBKNjSZKzXXXfWFXa-718-720.png" width="250px; margin: auto;">

### 组件效果

![](https://gw.alipayobjects.com/zos/rmsportal/eTajnIFhAnYArKvcbzWM.gif)
