<template>
  <div v-if="message.visiable" :class="parClass" :node-type="parNode">
    <div :class="mainClass">
      <div class="dialogHead">
        {{ message.header ? message.header : '' }}
        <div class="dialogHeadClose" node-type="dialogHeadClose" @click="closeDialog">
          <span class="dialogHeadCloseImg"></span>
        </div>
      </div>

      <div class="dialogBody">
        <div class="prompt" node-type="prompt" v-html="message.html ? message.html : ''"></div>

        <p v-if=" btnTypeShow == 'second' " class="actionBtn">
          <button class="sureBtn" :node-type="sureBtnNode" @click="confirm"> 确定 </button>
          <button class="cancelBtn" node-type="hideDialog" @click="closeDialog"> 取消 </button>
        </p>
        <p v-else-if=" btnTypeShow == 'first' " class="actionBtn">
          <button class="failSureBtn" node-type="failSureBtn" @click="confirm"> 确定 </button>
        </p>

      </div>

      <div class="dialogFooter" node-type="confirmFooter">
        {{ message.footer ? message.footer : '' }}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'of_dialog',
    props: ['message'],
    mounted () {
      if (this.message.visiable) {
        $('[node-type='+this.parNode+']').fadeIn(400)

        if (!this.message.btnType) {
          setTimeout (() => {
            $('[node-type='+this.parNode+']').fadeOut(400, () => {this.message.visiable = false})
          }, 1500)
        }

      }
    },
    updated () {
      if (this.message.visiable) {
        $('[node-type='+this.parNode+']').fadeIn(400)

        if (!this.message.btnType) {
          setTimeout (() => {
            $('[node-type='+this.parNode+']').fadeOut(400, () => {this.message.visiable = false})
          }, 1500)
        }

        this.message.callback && this.message.callback()
      }
    },
    methods: {
      confirm () {
        if (this.message.buttons && this.message.buttons.confirm) {
          this.message.buttons.confirm()
        } else {
          if (this.btnTypeShow == 'first') {
            $('[node-type='+this.parNode+']').fadeOut(400, () => {this.message.visiable = false})
          }
        }
      },
      closeDialog () {
        if (this.message.buttons && this.message.buttons.cancel) {
          this.message.buttons.cancel()
        } else {
          $('[node-type='+this.parNode+']').fadeOut(400, () => {this.message.visiable = false})
        }
      }
    },
    computed: {
      btnTypeShow () {
        var mark = ''
        if (this.message.btnType && this.message.btnType == 2) {
          mark = 'second'
        } else if (this.message.btnType && this.message.btnType == 1) {
          mark = 'first'
        }
        return mark
      },
      parClass () {
        let messageName = this.message.name ? this.message.name : ''
        return 'dialog ' + messageName
      },
      parNode () {
        return this.message.name ? this.message.name : 'dialog'
      },
      mainClass () {
        let messageSize = this.message.size ? this.message.size : 'small'
        return 'dialogMain ' + messageSize
      },
      sureBtnNode () {
        return this.message.name ? this.message.name + 'SureBtn' : 'sureBtn'
      }
    }



  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/base";

  /*公共弹窗样式*/
  .dialog {
    background: rgba(51, 51, 51, 0.7);
    display:none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 14px;
    z-index: 1100;
  }
  .dialog .dialogMain {
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 0 -150px;
    width: 350px;
    height: auto;
    background: #ffffff;
    border-radius: 0;
    box-shadow: 1px 1px 1px 1px #aaaaaa;
    font-size:12px;
    z-index: 999;
  }
  .dialog .medium {
    width: 800px;
    margin-left:-400px;
    top:25px;
  }
  .dialog .big {
    width: 1100px;
    margin-left:-550px;
    top:25px;
  }
  .dialog .dialogHead {
    position:relative;
    width: 100%;
    line-height:30px;
    padding:8px;
    box-sizing:border-box;
    text-align:center;
  }
  .dialog .dialogHead .dialogHeadClose{
    position:absolute;
    top:10px;
    right:10px;
    width:16px;
    height:16px;
    cursor:pointer;
  }
  .dialog .dialogHead .dialogHeadClose .dialogHeadCloseImg{
    display:inline-block;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAaVJREFUOBGVkr1OwlAUx22bkEBio4tv4GyTAhuM6Du4uCgsVVx4jTpoaMunXxssLuALmA4lanwDH0CDSdUCLf5P4yFwQ4jepDnnnt7/797zIRWLxR1Zll+r1er72j+WYRjqZDLZlqfTqRaG4X25XN74q57Eo9GoH0WRpgwGg+dMJhOOx+OzXC7XcV33exWIxEEQ9PDqtm3bdYUOe573CEgEqrkKwmJIWiQmbQwghyDpdDpEXqau6x28LKA4LxZLktR0HKfB8RmAAhA9ARLh0AKExXh2Azc3WUxWmt+wXyqVDlDco0QisUcxyhnQOsQtPsN2KYB+EgRVPiQfN9csy2qTLy5ZDPBeVdUu/E18W8lk8o7jol36gkqlsj4cDntI4xa3f8CeplKpgmmabyJgoYj0k8Vwb1BtC915QYt9zMlFPp/vYk6+5iELABajYNcomM0HfyGfyyAzAIshuoLWYTFbhmDYzrPZbAf7eGJjAPXZ9/0+8r2EuMYi0TIE3ZlBJB4SHG4h53g8RaG4R4v3ATlRFGVX0TTtGDk/zI+nKBD3/BJ0p/AD4Hj+Yn9DwUYAAAAASUVORK5CYII=");
    background-repeat:no-repeat;
    background-size: 100% 100%;
    background-position: center;
    width:16px;
    height:16px;
    vertical-align:top;
  }
  .dialog .dialogBody {
    width: 100%;
    height: auto;
    padding: 15px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .dialog .prompt {
    width: 100%;
    height: auto;
    margin: 0;
    word-break: break-all;
  }
  .dialog .actionBtn {
    width: 100%;
    margin: 22px 0 0;
  }
  .dialog .actionBtn button{
    margin: 0 5px;
    padding: 0;
    font-size: 12px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    outline: none;
    cursor: pointer;
  }
  .dialog .sureBtn,
  .dialog .failSureBtn
  {
    border: 1px solid #ff7711;
    background: #ff7711;
    color: #ffffff;
  }
  .dialog .cancelBtn {
    border: 1px solid #cecece;
    background: #ffffff;
  }
  .dialog .sureBtn:hover,
  .dialog .sureBtn:active,
  .dialog .sureBtn:focus,
  .dialog .sureBtn:link {
    opacity: 0.8;
  }
  .dialog .cancelBtn:hover,
  .dialog .cancelBtn:active,
  .dialog .cancelBtn:focus,
  .dialog .cancelBtn:link {
    background: #eeeeee;
    opacity: 0.8;
  }
  .dialog .dialogFooter {
    padding: 8px;
    width: 100%;
    line-height:30px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*公共弹窗样式结束*/
</style>


/*
调用方法，传入对象option
var option = {
visiable: false,
header: '我是头部',
footer: '我是底部',
html: '我是中间',
btnType: 2,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
name:'try',        //(弹窗node-type名称,如果存在的话弹窗的class中也会增添一个名称,可以对这个新增的class名称进行css扩展，针对本个弹窗，具有独特性和多弹窗共存性质，用作css补充，这样可以实现任意样式的弹窗)
size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
callback: function () {
console.log('弹窗完成后的回调，弹窗出现后立即执行')
},
buttons: {
confirm: function () {
console.log('test confirm btn fun!')
},
//cancel: function () {
//    var nodeName = $('[node-type="test"]')
//    nodeName.fadeOut(400)
//    setTimeout(function () {
//        nodeName.remove()
//    }, 400)
//    console.log('夺得取消按钮的最高控制权!')
//}
}
}
dialog.init(option)
*/
