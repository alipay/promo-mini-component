# ant-mini-wheel-draw

## 转盘玩法组件使用文档

#### Installation

``` code
yarn add ant-mini-wheel-draw
```

#### Usage

##### init

+ json

``` html
{
  "usingComponents": {
    "wheel": "ant-mini-wheel-draw/es/wheel/index"
  }
}
```

+ js

```js
Page({
  data: {
    prizeList: [
      {
        name: 'H&M100元优惠券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/nIQUKeYBbJWliGJVhVmx.png'
      }, {
        name: '2元话费券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/HkrVjjjuxZPUMCUbPazb.png'
      }, {
        name: '45元飞猪出行券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cDctUxwBLPCszQHRapYV.png'
      }, {
        name: 'H&M10元优惠券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/FAmIWZAWpUwlRFKqQDLz.png'
      }, {
        name: '2元流量券',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cuGomeXzMyeeZMjvVjBj.png'
      }, {
        name: '未中奖',
        img: 'https://zos.alipayobjects.com/rmsportal/dwhgPyWAcXuvJAWlSSgU.png'
      }
    ],
    prizeName: '2元话费券',
    totalTimes: 2,
    curTimes: 0,
    result: '',
  },
  /*
    @param name 获奖项名字
    @param times 当前转动次数
  */
  onStart (name, times) {
    // 转盘开始转动
    this.setData({
      result: `第${times}次抽奖中，请稍候...`,
      curTimes: times++
    })
  },
  /*
    @param name 获奖项名字
    @param times 当前转动次数
  */
  onFinish (name, times) {
    // 转盘结束转动
     this.setData({
      result: name === '未中奖' ? '很遗憾，差点就中奖了' : `恭喜你，获得${name}`,
      prizeName: this.data.prizeList[Math.floor(Math.random() * 6)].name,
    })
  }
});

```

+ xaml
```html
<view class="container">
  <wheel
    width="22em"
    prizeList="{{prizeList}}" // 奖项列表
    prizeName="{{prizeName}}" // 获奖项目名称
    rotTimes="{{totalTimes}}" // 转盘机会次数
    onStart="onStart" // 转盘开始旋转回调
    onFinish="onFinish" // 转盘结束旋转回调
  />
  <view class="times">
    <text>你还有{{totalTimes - curTimes}}次抽奖机会</text>
  </view>
  <view class="result">
    <text>{{result}}</text>
  </view>
</view>

```

#### Config Options
 属性         | 类型 | 默认值 |含义
-----|------|---- | ----
width       |Number|300|转盘容器宽度【必填】，默认单位 px
initDeg     |Number|0|转盘初始化角度旋转偏移【选填】，单位 reg
rotTimes    |Number|1|抽奖机会次数【选填】，当抽奖次数大于该值时不可再抽奖
prizeList   |Array|[]|奖品列表【必填】，长度为6，每一项必须包含img（奖品图片） 和 name（奖品名字）
prizeName   |String|''|中奖的奖品名字【必填】，值需要存在于 prizeList 的 name 字段中
prizeWidth  |Number|80|奖品图片宽度【选填】，默认单位 px，插件会根据 width 选项值自动计算，建议不填
prizePaddingTop |Number|20|奖品图片距圆弧的内边距【选填】，默认单位 px，插件会根据 width 选项值自动计算，建议不填
bgImg       |String|背景图片src|转盘扇面背景图地址【选填】
btnImg      |String|按钮图片 src|转盘按钮背景图地址【选填】
onStart     |Function|(name, times) => {}|旋转开始回调【选填】，name：中奖项name，times：当前是第几次旋转
onFinish    |Function|(name, times) => {}|旋转结束回调【选填】，name：中奖项name，times：当前是第几次旋转
onTimesUp    |Function|() => {}| 抽奖次数用尽后，再次点击抽奖按钮会触发该回调

**prizeWidth**
每一个扇形区的奖品图片宽度，插件自动计算

**prizePaddingTop**
每一个扇形区的奖品图片距离圆弧的内边距，插件自动计算

`以上两个选项当效果不佳时可以自定义，直接传入数字默认单位为px,需自定义单位可以传入字符串，如2em`


---

###### `initDeg`参数视觉效果示例

bgImg(转盘背景图示例)|initDeg(旋转的角度)
-----|-----
`initDeg`为0或不填|`initDeg`为30
<img src="https://gw.alipayobjects.com/zos/rmsportal/YIunNQVWkFRxUTaUNhOZ.png" width="200">|<img src="https://gw.alipayobjects.com/zos/rmsportal/aYGGRFIJrlbNUZlWamAF.png" width="200">

### Preview

打开浏览器，即可看到效果
<img src="https://gw.alipayobjects.com/zos/rmsportal/BBLOuGiCEaTqJEmnFXgQ.gif">

#### License
[The MIT License (MIT).](http://opensource.org/licenses/MIT)
