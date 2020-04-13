# ant-mini-hit-eggs

## 砸金蛋支付宝小程序组件

#### Installation

```
yarn add ant-mini-hit-eggs
```

#### Usage

+ json

```json
{
  "usingComponents": {
    "hit-geggs": "ant-mini-hit-eggs/es/hit-geggs/index"
  }
}
```

+ js

```js
Page({
  data: {
    disabled: false,
    times: 0
  },
  onStart(index) {
    console.log('开始砸金蛋', index);
    this.setData({
      times: ++this.data.times,
    })
  },
  onFinish(index) {
    console.log('砸金蛋结束', index);
    if (this.data.times >= 3) {
      this.setData({
        disabled: true,
      });
    }
  }
});
```
+ xaml
```html
<view>
  <hit-geggs
    onStart="onStart"
    onFinish="onFinish"
    disabled="{{disabled}}"
  />
</view>

```

#### Config Options

 属性 | 类型 | 默认值 | 含义
-----|------|-----|-----
eggsCount | Number | 9| 金蛋个数
eggCol| Number | 3 | 金蛋列数
eggWidth| Number | 200 | 金蛋大小，单位 rpx
hammerWidth| Number | 100 | 锤子大小， 单位 rpx
eggMarginTop| Number | 20 | 金蛋上边距
hammerOriginX| Number | -20 | 锤子原点距离组件右上顶点的偏移 X，左正右负，单位 rpx
hammerOriginY| Number | -20 | 锤子原点距离组件右上顶点的偏移 Y，下正上负，单位 rpx
jumpingInterval| Number | 600 | 金蛋跳动时间间隔，单位 ms
smashingDuration| Number | 1500 | 砸金蛋持续时间，单位 ms
className| String | '' | 自定义类名
disabled| Boolean | false | 是否进行游戏
onStart| Function | (index) => {} | 砸金蛋开始的回调，参数：index 被砸金蛋的下标
onFinish| Function | (index) => {} | 砸金蛋结束的回调，参数：index 被砸金蛋的下标
hammerIcon| String | [src](https://gw.alipayobjects.com/zos/rmsportal/XgogyVJXSBVXPxbTOFDK.png) |锤子图标
eggIcon| String | [src](https://gw.alipayobjects.com/zos/rmsportal/TaqyxvdUFYgIwFxMuaRL.png) |金蛋图标
jumpIcon| String | [src](https://gw.alipayobjects.com/zos/rmsportal/mTqmImAsoDZNmkdvuooP.png) |金蛋跳动的图标
redBagIcon| String | [src](https://gw.alipayobjects.com/zos/rmsportal/OgfiOSzclCukkGfwbaGw.png) |金蛋被砸的图标
smashedIcon| String | [src](https://gw.alipayobjects.com/zos/rmsportal/bItnDJuMaqJPBeKfhkMG.png) |金蛋砸碎的图标

#### API

* 开始游戏 `disabled=true`
* 暂停游戏 `disabled=false`
* 开始砸金蛋  `onStart`
* 结束砸金蛋  `onFinish`

### Preview

<img src="https://gw.alipayobjects.com/zos/rmsportal/iFSwnEynxOrBjogrEQGc.gif">

#### License
[The MIT License (MIT).](http://opensource.org/licenses/MIT)
