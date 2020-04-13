## 小程序刮刮卡组件

## 使用说明

### 安装组件
```
yarn add ant-mini-scratch-card
```
### 使用示例
**json**
```json
{
  "defaultTitle": "刮刮卡小程序组件",
  "allowsBounceVertical": "NO",
  "usingComponents": {
    "scratch": "ant-mini-scratch-card/es/scratch/index"
  }
}
```
**xaml**
```html
<view>
  <scratch
    tipText="刮刮我，有惊喜~"
    tipColor="#902d02"
    coverColor="#ffae8a"
    ctxLogoUrl="https://gw.alipayobjects.com/zos/rmsportal/iGLmHkSxYfXveGhuzzFf.png"
    resultText=''
    autoFadeOut=true
    resultText="{{result}}"
    onFinish="onFinish"
  />
</view>
<!-- 其中，result 为动态获取的抽奖结果 -->
```
**js**
```js
const app = getApp();
Page({
  data: {
    content: 'demo',
    result: ''
  },
  onLoad(options) {
    setTimeout(() => {
      this.setData({
        result: '很遗憾，差点就中奖了'
      });
    }, 1000);
  },
  onFinish() {
    console.log('刮奖结束了');
  }
});
```
**效果图**

![](https://img.alicdn.com/tfs/TB1KwDApXkoBKNjSZFkXXb4tFXa-598-297.png)

### 高级用法
当抽奖结果显示为图片或需要自定义样式修饰时，可以传入`slot`,并将`resultText`值设置为`''`
```html
<!-- 将 resultText 设置为空字符串 -->
<scratch resultText=''>
  <!-- 此处为 slot 子节点内容 -->
  <view class="result">
    <text>{{result}}</text>
  </view>
</scratch>
```
----
### 参数说明

 属性 | 类型 | 默认值 | 含义
---|---|---|---
id         |String|scratch-canvas| 组件标识，页面唯一
width         |Number|300|刮刮卡宽度，单位`px`
height        |Number|150|刮刮卡高度，单位`px`
tipText       |String|刮刮我，有惊喜|刮奖区域提示文字
tipColor      |String|#aaa|提示文字的颜色
tipSize       |Number|20|提示文字的字号，单位`px`
lineWidth     |Number|25|擦除线宽度，单位`px`
activePercent |Number|0.4|当被擦除比例达到该值时刮奖结束，取值范围`0-1`
autoFadeOut   |Boolean|true|当值为`true`且被擦除比例达到`activePercent`选项值时刮奖图层自动消失
ctxLogoUrl    |String||刮奖区图片背景，小程序接口限制目前只支持线上`cdn`地址或离线包地址，`cdn`需返回头 `Access-Control-Allow-Origin: *`
coverColor    |String|#dbdbdb|刮奖区背景色，当背景图片透明度为`0`时无效
resultText    |String|谢谢参与|刮奖结果
onFinish      |Function|()=>{}|刮奖结束回调，当被擦除比例达到`activePercent`选项值时触发

> 由于小程序当前接口限制，暂不支持 `rpx`、`rem`等像素单位，目前仅支持 `px`

## 开发

+ 文档
[https://docs.alipay.com/mini/ide/overview](https://docs.alipay.com/mini/ide/overview)
