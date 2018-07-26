<template>
  <div class="source-item-par">
    <div v-for="(item, index) in source" class="source-item">
      <div class="choose home-flex-x-start">
        <div class="choose-type">
          <select v-model="item.source_type" @change="change(item)">
            <option value="">请选择资源类型</option>
            <option value="1">轮播</option>
            <option value="2">专题</option>
            <option value="3">左图右文案</option>
            <option value="4">右图左文案</option>
            <option value="5">横排三张图</option>
            <option value="6">横排两图瀑布流</option>
          </select>
        </div>
        <div class="show-control home-img"><img src="../../../assets/img/down.png"></div>

      </div>

      <div v-if="item.source_type == 1" class="source source-carousel">
        <div class="carousel-content">
          <div v-for="itemSon in item.source_img" class="carousel-item">
            <div class="img home-img">
              <img :src="itemSon.source_url || ''">
            </div>
            <div class="context">
              <input type="text" placeholder="标题" v-model="itemSon.source_title">
            </div>

          </div>


          <div class="add-img">
            <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
          </div>

        </div>

      </div>

      <div v-if="item.source_type == 2" class="source source-subject">
        <div class="subject-content home-flex-x-between">
          <div class="img home-img">
            <img v-if="item.source_img.length" :src="item.source_img[0].source_url || ''">

            <div v-if="!item.source_img.length" class="add-img">
              <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
            </div>
          </div>

          <div class="context">
            <textarea placeholder="write something"  v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 3" class="source source-left-img">
        <div class="subject-content home-flex-x-between">
          <div class="img home-img">
            <img v-if="item.source_img.length" :src="item.source_img[0].source_url || ''">

            <div v-if="!item.source_img.length" class="add-img">
              <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
            </div>
          </div>

          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 4" class="source source-right-img">
        <div class="subject-content home-flex-x-between">
          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

          <div class="img home-img">
            <img v-if="item.source_img.length" :src="item.source_img[0].source_url || ''">

            <div v-if="!item.source_img.length" class="add-img">
              <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
            </div>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 5" class="source source-three">
        <div class="subject-content">
          <div class="img-group">
            <div v-for="itemSon in item.source_img" class="img home-img">
              <img :src="itemSon.source_url || ''">
            </div>

            <div v-if="item.source_img.length < 3" class="add-img">
              <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
            </div>
          </div>

          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 6" class="source source-two-waterfall">
        <div class="waterfall-content">
          <div v-for="itemSon in item.source_img" class="carousel-item">
            <div class="img home-img">
              <img :src="itemSon.source_url || ''">
            </div>
            <div class="context">
              <input type="text" placeholder="标题" v-model="itemSon.source_title">
            </div>

          </div>

          <div class="add-img">
            <input @change="uploadFile" :data-index="index" :data-type="item.source_type" type="file">
          </div>

        </div>
      </div>

    </div>

    <Dialog :message="message"></Dialog>
    <div class="home-hidden"><img id="target" src=""></div>

  </div>
</template>

<script>
import { mapState } from "vuex"
import { uploadImg, uploadBase64Img } from '@/api/detail'
import Dialog from '@/components/dialog.vue'
import jcrop_plu from '@/utils/jcrop/jcrop'


export default {
  name: 'Home',
  data () {
    return {
      imgPath: 'person', // 服务器上存储图片的路径
      // 弹窗模板
      message: {} // dialog弹窗数据

    }
  },
  computed: {
    ...mapState([
      'source' // 当前选中的tab
    ])
  },
  props: [],
  created () {

  },
  methods: {
    change (item) {
      // 清空单项的其他数据
      item.source_content = ''
      item.source_img = []
    },

    async uploadFile (e) {
      const _this = this

      const count = e.target.getAttribute("data-index") // 当前数据索引
      const type = e.target.getAttribute("data-type") // 当前数据的资源类型
      const curConfig = this.getCutConfig(type)
      const setSelect = curConfig.setSelect
      const aspectRatio = curConfig.aspectRatio

      // 文件
      const file = e.target.files[0]
      let file_type = this.imgPath // 存储图片路径(这里指的是服务器端的路径)
//      console.log(e.target.files[0])

      // 不是图片禁止上传
      const sourceType = file.type // 上传的资源类型
      if (! /image/g.test(sourceType)) {
        let option = {
          visiable: true,
          html: '亲，请上传图片类型的资源哦~😁',
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option

        return false
      }

      // 超过1.5M图片禁止上传，提供压缩图片方式
      const imgSize = file.size // 上传图片的大小（单位：B）
      if (imgSize / (1000000) > 1.5) {
        let option = {
          visiable: true,
          html: '<div>亲，图片太大啦，请先使用熊猫压缩压缩下图片呗~😁</div>' +
          '<div><a style="text-decoration: underline;color:#80c2ff;" href="https://tinypng.com/" target="_blank">熊猫压缩</a></div>',
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option
        return false
      }

      let formData = new FormData()
      formData.append('file', file)

      try {
        const dataList = await uploadImg(formData, file_type)

        // 更新dom
        const imgUrl = dataList.target_path || ''

        // 预加载图片，图片加载好再显示裁剪弹窗
        let imgLoad = new Image()
        imgLoad.src = imgUrl
        imgLoad.onload = function () {

          // 裁剪弹窗生成
          const html = `<div><img id="dialog_target" class="img-show" src="${imgUrl}"></div>`
          let option = {
            visiable: true,
            header: '',
            footer: '',
            html: html,
            btnType: 2,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
            name: 'jcrop_dialog',        //(弹窗node-type名称,如果存在的话弹窗的class中也会增添一个名称,可以对这个新增的class名称进行css扩展，针对本个弹窗，具有独特性和多弹窗共存性质，用作css补充，这样可以实现任意样式的弹窗)
            size: 'big',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
            callback: function () {
              $('#target').attr('src', imgUrl)

              jcrop_plu.destroy() // 先注销掉当前的裁剪.
              jcrop_plu.init({
                target: $('#dialog_target'), // 目标裁剪图片元素名称
                jcrop_config: { // Jcrop的配置信息
                  setSelect: setSelect, // 筛选框初始化位置和宽度（[x坐标，y坐标，宽度，高度]）
                  aspectRatio: aspectRatio, // 选框宽高比（width/height）
                  boxWidth: 600, // 画布宽度
                  boxHeight: 400 // 画布高度
                },
                select_callback: function (c) { // 筛选框移动时的回调函数（返回筛选框的位置和尺寸信息）
//                   console.log(c)
                  var html = '<div class="js-coords" style="z-index:10000;position: absolute;top: 0;left: 0;color: #f71;">' +
                    Math.floor(c.w) + ' * ' + Math.floor(c.h) + '</div>'

                  $('.js-coords').remove()
                  $('.jcrop-box').last().after(html)

                }
              })

            },
            buttons: {
              confirm: function () {
                let img = jcrop_plu.getDataURL() // 得到裁剪后的base64文件流
                _this.uploadBase64(img, count) // 上传base64裁剪后的文件方法

              },
              cancel: function () {
                $('[node-type="jcrop_dialog"]').fadeOut(400, function () {
                  _this.message.visible = false

                  // 清空添加图片按钮的值
                  $('.add-img').find('[type="file"]').val('')
                })

              }

            }

          }
          _this.message = option

        }

      } catch (error) {
        let option = {
          visiable: true,
          html: error.message,
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option

      }

    },

    // 上传base64文件方法
    async uploadBase64 (img, count) {
      const _this = this

      // 组织传参，将图片base64数据流上传
      let data = {
        image: img.base64,
        path: this.imgPath // 服务器上存储图片的路径
      }

      try {
        const dataList = await uploadBase64Img(data)
//      console.log(dataList)

        // 更新dom
        let imgObj = {
          source_url: dataList.target_path || '',
          source_title: ''
        }
        let arr = this.source
        arr[count].source_img.push(imgObj)

        this.$store.commit('updateSource', arr)

        $('[node-type="jcrop_dialog"]').fadeOut(400, function () {
          _this.message.visible = false

          // 清空添加图片按钮的值
          $('.add-img').find('[type="file"]').val('')
        })

      } catch (error) {
        let option = {
          visiable: true,
          html: error.message,
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option

      }


    },

    // 获取裁剪框初始化配置信息
    getCutConfig (type) {
      const typeNew = String(type)
      let setSelect = [100, 100, 300, 300]
      let aspectRatio = 1

      switch (typeNew) {
        case ('1'): setSelect = [100, 100, 220, 145]; aspectRatio = 220/145; break;
        case ('2'): setSelect = [100, 100, 370, 240]; aspectRatio = 370/240; break;
        case ('3'): setSelect = [100, 100, 230, 307]; aspectRatio = 230/307; break;
        case ('4'): setSelect = [100, 100, 230, 307]; aspectRatio = 230/307; break;
        case ('5'): setSelect = [100, 100, 185, 245]; aspectRatio = 185/245; break;
        case ('6'): setSelect = [100, 100, 175, 220]; aspectRatio = 175/220; break;

      }

      return {
        setSelect,
        aspectRatio
      }

    }

  },
  mounted () {

  },
  watch: {
//    'source': {
//      handler(val, oldVal) {
//        console.log(val)
//      },
//      deep: true
//    },

  },
  components: {
    Dialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../../../../assets/css/base";

  .source-item-par {
    padding-top: 40px;
    padding-bottom: 40px;
    .source-item {
      margin-bottom: 40px;
      padding-bottom: 80px;
      border-bottom: 1px solid #fff;

      .choose {
        margin-bottom: 40px;
        .choose-type {
          select {
            width: 250px;
            height: 36px;
            background: #D8D8D8;
            border-radius: 4px;
            border: none;
            margin-right: 35px;
            font-size: 16px;
            color: #fff;
          }
        }

        .show-control {
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }

      /*轮播内容样式*/
      .source-carousel {
        .carousel-content {
          overflow: hidden;
          .carousel-item {
            float: left;
            margin-right: 80px;

            .img {
              width: 220px;
              height: 145px;
              margin-bottom: 25px;
            }
            .context {
              width: 220px;
              height: 36px;
              input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                background-color: #fff;
                border: none;
                border-radius: 4px;
                padding: 0 10px;
                color: #000;
                font-size: 16px;
              }
            }
          }

          .add-img {
            float: left;
            width: 120px;
            height: 120px;
            background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
            cursor: pointer;

            [type='file'] {
              width: 100%;
              height: 100%;
              opacity: 0;
              line-height: 300px;
              cursor: pointer;
            }
          }

        }

      }

      /*专题内容样式*/
      .source-subject {
        .subject-content {
          .img {
            width: 370px;
            height: 240px;

            .add-img {
              float: left;
              width: 120px;
              height: 120px;
              background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
              cursor: pointer;

              [type='file'] {
                width: 100%;
                height: 100%;
                opacity: 0;
                line-height: 300px;
                cursor: pointer;
              }
            }
          }

          .context {
            width: 480px;
            height: 145px;
            margin-right: 105px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*左图右内容样式*/
      .source-left-img {
        .subject-content {
          .img {
            width: 230px;
            height: 305px;
            margin-left: 45px;

            .add-img {
              float: left;
              width: 120px;
              height: 120px;
              background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
              cursor: pointer;

              [type='file'] {
                width: 100%;
                height: 100%;
                opacity: 0;
                line-height: 300px;
                cursor: pointer;
              }
            }
          }

          .context {
            width: 480px;
            height: 145px;
            margin-right: 105px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*右图左内容样式*/
      .source-right-img {
        .subject-content {
          .context {
            width: 480px;
            height: 145px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

          .img {
            width: 230px;
            height: 305px;
            margin-right: 80px;

            .add-img {
              float: left;
              width: 120px;
              height: 120px;
              background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
              cursor: pointer;

              [type='file'] {
                width: 100%;
                height: 100%;
                opacity: 0;
                line-height: 300px;
                cursor: pointer;
              }
            }
          }

        }

      }

      /*横排三张图样式*/
      .source-three {
        .subject-content {
          .img-group {
            margin-bottom: 70px;
            overflow: hidden;

            .img {
              float: left;
              width: 186px;
              height: 245px;
              margin-right: 100px;
            }

            .add-img {
              float: left;
              width: 120px;
              height: 120px;
              background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
              cursor: pointer;

              [type='file'] {
                width: 100%;
                height: 100%;
                opacity: 0;
                line-height: 300px;
                cursor: pointer;
              }
            }
          }

          .context {
            width: 480px;
            height: 145px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*横排两张瀑布流样式*/
      .source-two-waterfall {
        .waterfall-content {
          overflow: hidden;
          .carousel-item {
            float: left;
            margin-right: 80px;

            .img {
              width: 175px;
              height: 220px;
              margin-bottom: 25px;
            }
            .context {
              width: 175px;
              height: 36px;
              input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                background-color: #fff;
                border: none;
                border-radius: 4px;
                padding: 0 10px;
                color: #000;
                font-size: 16px;
              }
            }
          }

          .add-img {
            float: left;
            width: 120px;
            height: 120px;
            background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
            cursor: pointer;

            [type='file'] {
              width: 100%;
              height: 100%;
              opacity: 0;
              line-height: 300px;
              cursor: pointer;
            }
          }

        }

      }

    }

    .jcrop_dialog{
      
      .prompt {
        background: url("../../../../../assets/img/loading.gif") no-repeat center / 30px 30px;
      }

      .img-show{
        opacity: 0;
        max-width:600px;
        max-height: 400px;
      }

      .prompt{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }

</style>
