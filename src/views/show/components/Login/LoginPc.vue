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
              <input type="text" placeholder="请输入手机/邮箱">
            </div>
          </div>

          <!--密码-->
          <div class="password home-flex-x-between">
            <div class="home-img"><img src="../../assets/img/login/lock.png"></div>
            <div class="input-par">
              <input type="text" placeholder="请输入登录密码">
            </div>
          </div>

          <!--登录按钮-->
          <div class="btn-group home-flex-x-end">
            <div class="home-btn">登录</div>
          </div>
        </div>

        <a class="apply" href="javascript:;">我要注册!</a>

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
import moment from 'moment'

export default {
  name: 'Home',
  data () {
    return {
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
    background: rgba(255, 119, 17, 0.2);

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
              height: 30px;
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
                  height: 30px;
                  background: none;
                  border: none;
                  color: #fff;
                  font-size: 16px;
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
