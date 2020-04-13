# ant-mini-flip-draw
  支付宝小程序：翻牌抽奖

## Install

### tnpm

```dash
yarn add ant-mini-flip-draw
```
## Usage

### json

```json
{
  "usingComponents": {
    "flipdraw": "ant-mini-flip-draw/component/index"
  }
}
```

### js

``` js
Page({
  data: {
    prizeList: [{
      'name': '谢谢参与1',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
    }, ... ],
    prizeName: '',
    flipAllCards: false,
    isDrawing: false,
  },
  onFlipStart() {
    console.log('开始了，这个时候最好页面控制下 loading 状态，组件内不做控制');
    this.setData({
      isDrawing: true, // 修改抽奖状态，防止重复点击多次请求
    });
    // 开始抽奖
    drawRequest().then(res => {
      console.log('拿到结果，设置奖品信息');
      if (res.success) {
        this.setData({
          prizeName: '666元红包',
          isDrawing: false,
        });
      } else {
        this.setData({
          isDrawing: false, // 抽奖结束一定要还原 isDrawing 状态
        });
      }
      this.showResultDialog()
    });
  },
  showResultDialog() {
    // do something
    this.setData({
      flipAllCards: true, // 将剩下未翻过的牌自动翻，展示奖品结果。
    })
  }
});
```
### xaml
```html
<view>
<flipdraw
    prizeList="{{prizeList}}"
    prizeName="{{prizeName}}"
    isDrawing="{{isDrawing}}"
    flipAllCards="{{flipAllCards}}"
    onFlipStart="onFlipStart"
  />
</view>
```

![](https://gw.alicdn.com/tfs/TB1XU48XVYqK1RjSZLeXXbXppXa-254-452.gif)

## API
属性名 | 类型 | 默认值 | 描述 |
--- | --- | --- | ---
prizeList | Array | [] | 奖项列表【必填】，须包含 `name` 和 `icon` 字段
prizeName | String | '' | 抽奖结果的奖品 `name`【必填】，其值必须位于 `prizeList` 中
cardNum | Number | 9 | 展示多少张卡片，推荐3/6/9
cardHeight | Number | 210 | 宽度固定210，高度需要等比换算设置
cardBgImg | String | - | 卡背图片
unawardImg | String | - | 未中奖展示图片
isDrawing | Boolean | - | 是否正在抽奖，用于限制点击
flipAllCards | String | - | 是否翻转剩余卡片
onFlipStart | Function | () => {} | 转动开始的回调【选填】


#### 注意
- 请求前一定要设置 isDrawing = true，请求结束后一定要设置 isDrawing = false。
- cardHeight 卡片高度是相对750视觉稿设置的，宽高默认210x210rpx。宽度固定，高度可变。比如210x300的图片，cardHeight就设置为300；如果是200x250的图片需要等比转换一下，cardHeight = 210 * (250/200)