## 小程序手势解锁组件

## 使用说明

### 安装组件
```
yarn add ant-mini-lock
```

### 使用示例
**json**

```
{
  "defaultTitle": "手势解锁玩法",
  "allowsBounceVertical": "NO",
  "usingComponents": {
    "lock": "ant-mini-lock/src/lock/index"
  }
}
```

**xaml**
```
<lock
    canvasWidth="300"
    canvasHeight="300"
    drawColor="#3985ff"
    canvasId="canvasLock"
    chooseType="3"
    titleColor="#000000"
    titleText="绘制解锁图案"
    onFinish="onFinish">
</lock>
```

**js**
```
注册onFinish方法
onFinish(){
    console.log('do something')
}
```
**效果图**
 ![手势解锁组件](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/rTqABpYPaxqFRXsLLspC.gif)


### 参数说明
   属性 | 类型 | 默认值 | 含义
   ---|---|---|---
   canvasWidth         |Number|300|canvas区域宽度，单位`px`
   canvasHeight        |Number|300|canvas区域高度，单位`px`
   canvasId            |String|canvasLock|canvas区域id
   drawColor           |String|#3985ff|圆圈和连线绘制颜色
   chooseType          |Number|3|矩阵单边圆圈个数，默认九宫格
   titleColor          |String|#000000|标题文案颜色
   titleText           |String|绘制解锁图案|标题默认文案
   onFinish            |Function|()=>{}|刮奖回调，当绘制正确时触发
   > 由于小程序当前接口限制，暂不支持 `rpx`、`rem`等像素单位，目前仅支持 `px`
## 开发
   + 文档 [https://docs.alipay.com/mini/ide/overview](https://docs.alipay.com/mini/ide/overview)
