
// jcrop插件github示例demo: https://github.com/tapmodo/Jcrop
// jcrop插件api详解: http://blog.csdn.net/xht555/article/details/43407141

import './vender/Jcrop.css'
import './vender/Jcrop.js'

var jcrop = {}

/*
 调用方法，传入对象option
  1.先设置jcrop: 执行jcrop.init({...}) // 进行相应配置
  2.获取裁剪后base64数据流信息API: jcrop.getDataURL()
  3.移除jcrop(恢复初始状态)的API: jcrop.destroy()

  示例demo：
 html(注：结构不能变，img标签外面必须套一个div，这个div的命名可以不设置):
   <div id="interface" class="page-interface">
    <img src="../../../../images/page/market-manage/activity-signup/police.jpg" id="target">
   </div>

 <div id="cut">裁剪</div>

 js:
    // 设置jcrop方法(下方调用)
   function setting_jcrop () {
     jcrop.init({
       target: $('#target'), // 目标裁剪图片元素名称
       jcrop_config: {
          setSelect: [175, 100, 400, 300], // 筛选框初始化位置和宽度（[x坐标，y坐标，宽度，高度]）
       },
       select_callback: function (c) { // 筛选框移动时的回调函数（返回筛选框的位置和尺寸信息）
          console.log(c)
       }
     })
   }

   setting_jcrop()

   $(document).on('click', '#cut', function () {
   let img_data = jcrop.getDataURL()

   let img = img_data.base64
   let width = img_data.width
   let height = img_data.height

   console.log(img_data)

    // 移除jcrop
   jcrop.destroy()

    // 2秒后，又重新启动jcrop
   setTimeout(() => {
      setting_jcrop()
   }, 2000)
   })

 */

jcrop.target = $('#target') //初始化默认image节点
jcrop.setSelect = [10, 10, 100, 100] // 筛选框初始化配置
jcrop.obj = '' // Jcrop的对象(用户jcrop的api的使用)

jcrop.init = function (option) {

  jcrop.image = new Image()
  jcrop.image.crossOrigin="http://*"

  this.setting(option)
}

// 初始化配置
jcrop.setting = function (option) {
  var config = {} // 合并默认参数和传入参数.

  var default_config = {
    setSelect: jcrop.setSelect, // 创建选框
    trackDocument: true,
    //bgColor: 'transparent', // 背景颜色
    bgOpacity: 0.5, // 背景透明度
    borderOpacity: 1, // 选框边框透明度
    minSize: [100, 100], // 选框最小尺寸
    aspectRatio: 1, // 选框宽高比（width/height）
    onChange: function () {}, // 选框改变是的事件
    onSelect: function (c) { //选框移动时执行此函数.
      jcrop.setSelect = [c.x, c.y, c.w, c.h] // 重新改变筛选框信息***

      option.select_callback && option.select_callback(c)
    },
    onRelease: function () {} // 选框取消时的事件
  }

  config = $.extend({}, default_config, option.jcrop_config)

  jcrop.target = option.target || jcrop.target // 覆盖掉初始换默认节点
  jcrop.image.src = jcrop.target.attr('src')
  jcrop.target.Jcrop(config, function () {
    jcrop.obj = this
  })

}

// 裁剪方法(得到最终base64的图片流数据、图片宽度、图片高度)
jcrop.getDataURL = function () {
  var sx = jcrop.setSelect[0], // 裁剪框x轴
    sy = jcrop.setSelect[1], // 裁剪框y轴
    sw = jcrop.setSelect[2], // 裁剪框宽度
    sh = jcrop.setSelect[3] // 裁剪框高度

  // 利用canvas裁剪
  var canvas = document.createElement("canvas")

  // console.log(jcrop.image)
  let quality = 0.92 // 图片压缩比，100%的时候裁剪后的图片将近原图的3倍，0.95的时候差不多，这里选择了0.92

  canvas.width = sw
  canvas.height = sh
  var context = canvas.getContext("2d")
  context.drawImage(jcrop.image, sx, sy, sw, sh, 0, 0, sw, sh )
  var imageData = canvas.toDataURL('image/jpeg', quality)

  // 返回裁剪后图片的base64数据流、宽度、高度.
  return {
    base64: imageData,
    width: sw,
    height: sh
  }
}

// 移除jcrop
jcrop.destroy = function () {
  jcrop.obj && jcrop.obj.destroy()
}


export default jcrop
