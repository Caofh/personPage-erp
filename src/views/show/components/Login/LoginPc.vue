<template>
  <div class="login-pc">
    <Header></Header>

    <div class="content">
      <div class="real-content-par">
        <div class="real-content">
          <!--账号-->
          <div class="phone home-flex-x-between">
            <div class="home-img"><img src="../../assets/img/login/phone.png"></div>
            <div class="input-par">
              <input v-model="account" type="text" placeholder="请输入手机/邮箱">
            </div>
          </div>

          <!--密码-->
          <div class="password home-flex-x-between">
            <div class="home-img"><img src="../../assets/img/login/lock.png"></div>
            <div class="input-par">
              <input v-model="password" type="text" placeholder="请输入登录密码">
            </div>
          </div>

          <!--登录按钮-->
          <div class="btn-group home-flex-x-end">
            <div @click="login" class="home-btn">登录</div>
          </div>
        </div>

        <a class="apply" href="./show.html#/apply">我要注册!</a>

      </div>
    </div>

    <Dialog :message="message"></Dialog>

  </div>
</template>

<script>
import Header from '@/components/HeaderPc.vue'
//import SourceItem from './pc-components/source-item.vue'
import Dialog from '@/components/dialog.vue'

//import $ from 'jquery'
import { mapState } from "vuex"
import { updateResource } from '@/api/detail'
import { login } from '@/api/login'
import moment from 'moment'
import cookie from 'component-cookie'

export default {
  name: 'Home',
  data () {
    return {
      account: '', // 账号
      password: '', // 密码
      message: {} //  dialog弹窗数据
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
    async login () {
      const emailMark = /@.*.com/.test(this.account) // 正则验证是否为邮箱

      const type = emailMark ? 2 : 1 // 如果是邮箱传2，电话传1
      const data = {
        phone: this.account,
        password: this.password,
        type: type
      }

      console.log(data)

      try {
        const dataList = await login(data)

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
    /*!*渐变色*!*/
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255, 255, 255, 0)), color-stop(30%, rgba(255, 119, 17, 0.68)));
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%);
    background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%);
    background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 119, 17, 0.68) 30%);

    .login-pc {

      .content {
        position: relative;
        width: 570px;
        height: 350px;
        margin: 100px auto 0;
        background: rgba(255, 255, 255, .1);
        box-shadow: 0 0 5px #f0f0f0;
        border-radius: 0 100px 0 100px;

        .real-content-par {
          position: absolute;
          background:rgba(255, 255, 255, .15);
          width: 560px;
          height: 340px;
          left: 50%;
          top: 50%;
          margin-left: -280px;
          margin-top: -170px;
          border-radius: 0 100px 0 100px;

          .real-content {
            position: absolute;
            width: 300px;
            height: 150px;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -75px;

            & > div {
              margin-bottom: 20px;
            }

            .phone, .password {
              width: 300px;
              height: 40px;
              box-shadow: 0 0 5px #fff;
              border-radius: 5px;
              padding: 0 5px;

              .home-img {
                width: 25px;
                height: 25px;
              }

              .input-par {
                input {
                  width: 260px;
                  height: 40px;
                  background: none;
                  border: none;
                  color: #fff;
                  font-size: 18px;
                }
                input::-webkit-input-placeholder{
                  color: #fff;
                }
                input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                  color: #fff;
                }
                input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                  color: #fff;
                }
                input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                  color: #fff;
                }
              }

            }

            .btn-group {
              .home-btn {
                font-size: 18px;
              }
            }
          }

          .apply {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: #fff;
            text-decoration: underline;
            font-size: 16px;
          }

        }

      }

    }
    
    
  }

</style>
