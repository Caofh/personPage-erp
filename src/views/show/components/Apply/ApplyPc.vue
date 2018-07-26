<template>
  <div class="login-pc">
    <Header></Header>

    <div class="content">
      <div class="real-content-par">
        <div class="home-flex-x-between" style="align-items: flex-start;">
          <div class="real-content">
            <div class="phone home-flex-x-start">
              <div>手机号<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.phone"></div>
              <div v-if="limitMark && !baseInfo.phone" class="error-tip">请输入手机号</div>
            </div>
            <div class="email home-flex-x-start">
              <div>邮箱<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.email"></div>
              <div v-if="limitMark && !baseInfo.email" class="error-tip">请输入邮箱</div>
            </div>
            <div class="nickname home-flex-x-start">
              <div>昵称<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.nickname"></div>
              <div v-if="limitMark && !baseInfo.nickname" class="error-tip">请输入昵称</div>
            </div>
            <div class="sex home-flex-x-start">
              <div>性别<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.sex"></div>
              <div v-if="limitMark && !baseInfo.sex" class="error-tip">请输入性别</div>
            </div>
            <div class="birthday home-flex-x-start">
              <div>出生日期：</div>
              <div><input type="text" v-model="baseInfo.birthday"></div>
              <!--<div v-if="limitMark && !baseInfo.birthday" class="error-tip">请输入出生日期</div>-->
            </div>
            <div class="password home-flex-x-start">
              <div>密码<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.password"></div>
              <div v-if="limitMark && !baseInfo.password" class="error-tip">请输入密码</div>
            </div>
            <div class="confirm-password home-flex-x-start">
              <div>确认密码<span class="red">*</span>：</div>
              <div><input type="text" v-model="baseInfo.confirmPassword"></div>
              <div v-if="limitMark && !baseInfo.confirmPassword" class="error-tip">请再次输入密码</div>
            </div>
            <div class="self-word home-flex-x-start">
              <div>座右铭：</div>
              <div><input type="text" v-model="baseInfo.selfWord"></div>
              <!--<div v-if="limitMark && !baseInfo.selfWord" class="error-tip">请输入座右铭</div>-->
            </div>

          </div>

          <div class="avator home-flex-x-start" style="align-items: flex-start;">
            <div>头像：</div>
            <div class="upload-img">
              <div :class="['edit', {'home-hidden': !uploadImgPath}]" node-type="edit"><input @change="uploadFile" type="file"></div>

              <div :class="['add', {'home-hidden': uploadImgPath}]"><input @change="uploadFile" type="file"></div>
            </div>
          </div>
        </div>

        <div @click="submit" class="submit home-btn">
          提交
        </div>
      </div>

    </div>

    <Dialog :message="message"></Dialog>
    <div class="home-hidden"><img id="target" src=""></div>

  </div>
</template>

<script>
import Header from '@/components/HeaderPc.vue'
import { uploadImg, uploadBase64Img } from '@/api/detail'
import { upBaseInfo } from '@/api/login'
import cookie from 'component-cookie'
import Dialog from '@/components/dialog.vue'
import jcrop_plu from '@/utils/jcrop/jcrop'

//import $ from 'jquery'
import { mapState } from "vuex"
import { updateResource } from '@/api/detail'
import moment from 'moment'

export default {
  name: 'Home',
  data () {
    return {
      limitMark: false, // 错误信息显示标识
      imgPath: 'person', // 服务端存取图片的路径
      uploadImgPath: '', // 上传过图片的路径
      message: {}, //  dialog弹窗数据

      baseInfo: {
        phone: '',
        email: '',
        nickname: '',
        sex: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        selfWord: ''
      }
    }
  },
  computed: {
    ...mapState([
      'source' // 当前资源
    ]),

  },
  created () {

  },
  methods: {
    async submit () {
      // 校验
      const mark = this.validate()
      if (!mark) {
        this.limitMark = true
        return false
      }


      const data = {
        ...this.baseInfo,
        uploadImgPath: this.uploadImgPath
      }

      try {
        const dataList = await upBaseInfo(data)

        let option = {
          visiable: true,
          html: dataList.original.msg || '操作成功',
          btnType: 3,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
          callback: function () {

            // 1.5秒自动跳转添加资源页面.
            setTimeout(() => {
              window.location.href = './show.html#/detail'

              cookie('login', '1', { maxage: 1 * 24 * 60 * 60 * 1000 }) // 记录登录状态(持续1天)
            }, 1500)
          }
        }
        this.message = option

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
    validate () {
      let mark = true

      // 校验不为空
      for (let key in this.baseInfo) {

        // 出生日期、座右铭不参加校验
        if (key != 'birthday' && key != 'selfWord') {
          if (!this.baseInfo[key]) mark = false
        }

      }

      return mark

    },
    async uploadFile (e) {
      const _this = this

      // 获取裁剪框的配置
      const curConfig = this.getCutConfig()
      const setSelect = curConfig.setSelect
      const aspectRatio = curConfig.aspectRatio

      // 文件
      const file = e.target.files[0]
      let file_type = this.imgPath // 存储图片路径(这里指的是服务器端的路径)
//      console.log(e.target.files[0])

      // 不是图片禁止上传
      const sourceType = file.type // 上传的资源类型
      if (!/image/g.test(sourceType)) {
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
//                  console.log(c)
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
                _this.uploadBase64(img) // 上传base64裁剪后的文件方法

              },
              cancel: function () {
                $('[node-type="jcrop_dialog"]').fadeOut(400, function () {
                  _this.message.visible = false

                  // 清空添加图片按钮的值
                  $('[type="file"]').val('')
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
    async uploadBase64 (img) {
      const _this = this

      // 组织传参，将图片base64数据流上传
      let data = {
        image: img.base64,
        path: this.imgPath // 服务器上存储图片的路径
      }

      try {
        const dataList = await uploadBase64Img(data)
//      console.log(dataList)

        const imgPath = dataList.target_path || ''

        // 更新dom
        _this.$nextTick(() => {

          $('[node-type="edit"]').css({
            'background-image': 'url('+imgPath+')'
          })
          _this.uploadImgPath = imgPath


          $('[node-type="jcrop_dialog"]').fadeOut(400, function () {
            _this.message.visible = false

            // 清空添加图片按钮的值
            $('[type="file"]').val('')
          })

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
    getCutConfig () {
      let setSelect = [100, 100, 110, 125]
      let aspectRatio = 110/125

      return {
        setSelect,
        aspectRatio
      }

    }

  },
  mounted () {

  },
  components: {
    Header,
    Dialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
  body {
    /*渐变色*/
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%) !important;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255, 255, 255, 0)), color-stop(30%, rgba(255, 119, 17, 0.68))) !important;
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%) !important;
    background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%) !important;
    background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%) !important;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%) !important;

    .login-pc {
      .content {
        position: relative;
        width: 800px;
        height: 600px;
        margin: 20px auto 0;
        background: rgba(255, 255, 255, .1);
        box-shadow: 0 0 5px #f0f0f0;
        border-radius: 0 100px 0 100px;

        .real-content-par {
          position: absolute;
          background:rgba(255, 255, 255, .15);
          width: 790px;
          height: 590px;
          border-radius: 0 100px 0 100px;
          left: 50%;
          top: 50%;
          margin-left: -395px;
          margin-top: -295px;
          padding: 50px 50px 10px 50px;

          .real-content {
            width: 470px;
            height: auto;

            & > div {
              margin-bottom: 20px;

              & > div:first-child {
                text-align: left;
                width: 80px;

                .red {
                  color: #ff0000;
                }
              }

              & > div:nth-child(2) {
                input {
                  width: 200px;
                  height: 30px;
                  line-height: 30px;
                  border: none;
                  background: #f0f0f0;
                  padding: 0 10px;
                  font-size: 16px;
                }
              }

              .error-tip {
                margin-left: 10px;
                color: #ff0000;
              }
            }

          }

          .avator {
            width: 200px;
            height: auto;

            .upload-img {
              width: 110px;
              height: 125px;

              .edit {
                width: 110px;
                height: 125px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;

                input {
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  line-height: 200px;
                  cursor: pointer;
                }
              }

              .add {
                width: 110px;
                height: 110px;
                background: url("../../assets/img/addImg.png") no-repeat center / 100%;

                input {
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  line-height: 200px;
                  cursor: pointer;
                }
              }
            }
          }

        }

      }

      .jcrop_dialog{

        .prompt {
          background: url("../../../../assets/img/loading.gif") no-repeat center / 30px 30px;
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
    
    
  }

</style>
